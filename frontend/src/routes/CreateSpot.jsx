import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/CreateSpot.scss';

import ChooseSpot from '../components/ChooseSpot';
import FormDetails from '../components/FormDetails';
import AddImage from '../components/AddImage';
import NavigationButton from '../components/NavigationButton';

export default function CreateSpot() {
  // for redirect after form submission
  const navigate = useNavigate();

  // FORM DATA STATE
  const [marker, setMarker] = useState([{}]);
  const [formData, setFormData] = useState({
    spot: { city: 'Victoria', province: 'BC', country: 'Canada' },
    visit: { rating: 5 },
    labels: []
  });
  // const [imagePreview, setImagePreview] = useState();

  // map state handler
  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarker([{ lat: lat, lng: lng }]);
    setFormData(prev => ({ ...prev, spot: { ...prev.spot, lat: lat, lng: lng } }));
  };

  // label state handlers
  const isClicked = label => formData.labels.filter(labelObject => labelObject.label_id === label.id).length > 0;
  const handleLabelClick = (e) => {
    const labelId = Number(e.target.id);
    const label = { label_id: labelId };
    const labelIsClicked = formData.labels.filter(labelObject => labelObject.label_id === labelId).length > 0;

    if (labelIsClicked) {
      setFormData(prev => ({ ...prev, labels: formData.labels.filter(labelObject => labelObject.label_id !== labelId) }));
    } else {
      setFormData(prev => ({ ...prev, labels: [...prev.labels, label] }));
    }
  };

  // form input state handler
  const handleFormChange = (event) => {
    const name = event.target.name;
    name === 'chosenName' && setFormData(prev => ({ ...prev, spot: { ...prev.spot, name: event.target.value } }));
    setFormData(prev => ({ ...prev, visit: { ...prev.visit, [name]: event.target.value } }));
    console.log(formData);
  };

  // file input state handler
  const handleFileInput = (e) => {
    setFormData(prev => ({ ...prev, visit: { ...prev.visit, image: e.target.files[0] } }));
    // setImagePreview(URL.createObjectURL(e.target.files[0]));
  };

  // data submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append('file', formData.visit.image);
      data.append('data', JSON.stringify(formData));
      await fetch('http://localhost:8080/api/spots', {
        method: 'POST',
        body: data
      });
      navigate("/spots/");
    } catch (error) {
      console.error('Sorry, we could not complete your request: ', error);
      throw error;
    }
  };

  return (
    <div className='createSpot__container'>
      <div className='createSpot__container--details'>
        <h1>Create a Spot</h1>

        {/* <div>
          <div className='createSpot__header'>
            <h2>Step 1: Choose your location</h2>
            <p>Click on the map to add a new pin!</p>
          </div>
          <ChooseSpot />
        </div> */}

        {/* <div>
          <div className='createSpot__header'>
            <h2>Step 2: Add your visit to this sunset spot</h2>
          </div>
          <FormDetails handleFormChange={handleFormChange} handleLabelClick={handleLabelClick} isClicked={isClicked} />
        </div> */}

        {/* <div>
          <div className='createSpot__header'>
            <h2>Step 3: Attach a picture of your sunset!</h2>
          </div>
          <AddImage handleFileInput={handleFileInput} />
        </div> */}

      </div>

      <div>
        <hr className='createSpot__line'></hr>

        <div className='createSpot__container--nav'>
          <NavigationButton direction={'back'} />
          <NavigationButton direction={'forward'} />
        </div>
      </div>

    </div>
  );
}