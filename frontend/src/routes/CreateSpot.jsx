import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/CreateSpot.scss';

import ChooseSpot from '../components/ChooseSpot';
import FormDetails from '../components/FormDetails';
import AddImage from '../components/AddImage';
import BackButton from '../components/BackButton';
import ForwardButton from '../components/ForwardButton';

export default function CreateSpot() {
  // for redirect after form submission
  const navigate = useNavigate();

  // FORM DATA STATE
  const [marker, setMarker] = useState([{}]);
  const [formData, setFormData] = useState({
    spot: { city: 'Victoria', province: 'BC', country: 'Canada', lat: '', lng: '' },
    visit: { chosenName: '', time_stamp: '', description: '', rating: 5, image: '' },
    labels: []
  });
  const [imagePreview, setImagePreview] = useState('');

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
  };

  // file input state handler
  const handleFileInput = (e) => {
    if (imagePreview) {
      setFormData(prev => ({ ...prev, visit: { ...prev.visit, image: '' } }));
      setImagePreview('');
    } else {
      setFormData(prev => ({ ...prev, visit: { ...prev.visit, image: e.target.files[0] } }));
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  // data submit handler
  const handleSubmit = async () => {
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

  // FORM VALIDATION
  const [activateNavButton, setActivateNavButton] = useState(false);
  // for each modal, check if input has been set
  const validateInput = () => {
    if (modal === 0 && formData.spot.lat !== '') {
      setActivateNavButton(true);
      return;
    }
    if (modal === 1 && 
        formData.visit.chosenName !== '' && 
        formData.visit.time_stamp !== '' && 
        formData.visit.description !== '' && 
        formData.visit.rating !== '') {
      setActivateNavButton(true);
      return;
    }
    if (modal === 2 && formData.visit.image !== '') {
      setActivateNavButton(true);
      return;
    } 
    setActivateNavButton(false);
  };

  // MODAL STATE
  const [modal, setModal] = useState(0);

  const handleBackClick = () => {
    if (modal === 0) {
      navigate("/spots/");
    } else {
      setModal(prev => prev - 1);
    }
  };

  const handleForwardClick = () => {
    if (modal === 2) {
      handleSubmit();
    } else {
      setModal(prev => prev + 1);
    }
  };

  // check for empty inputs after every time form data or modal changes
  useEffect(() => {
    validateInput();
  }, [formData, modal]);

  return (
    <div className='createSpot__container'>
      <div className='createSpot__container--details'>
        <h1>Create a Spot</h1>

        {modal === 0 &&
          <div>
            <div className='createSpot__header'>
              <h2>Step 1: Choose your location</h2>
              <p>Click on the map to add a new pin!</p>
            </div>
            <ChooseSpot onMapClick={onMapClick} marker={marker} />
          </div>
        }

        {modal === 1 &&
          <div>
            <div className='createSpot__header'>
              <h2>Step 2: Add your visit to this sunset spot</h2>
            </div>
            <FormDetails handleFormChange={handleFormChange} handleLabelClick={handleLabelClick} isClicked={isClicked} visitValues={formData.visit} />
          </div>
        }

        {modal === 2 &&
          <div>
            <div className='createSpot__header'>
              <h2>Step 3: Attach a picture of your sunset!</h2>
            </div>
            <AddImage handleFileInput={handleFileInput} imagePreview={imagePreview} />
          </div>
        }

      </div>

      <div>
        <hr className='createSpot__line'></hr>

        <div className='createSpot__container--nav'>
          <BackButton handleBackClick={handleBackClick} />
          <ForwardButton handleForwardClick={handleForwardClick} modal={modal} buttonOn={activateNavButton}/>
        </div>
      </div>

    </div>
  );
}
