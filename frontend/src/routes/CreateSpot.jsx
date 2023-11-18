import { useState, useEffect } from 'react';
import '../styles/CreateSpot.scss';
import '../styles/Label.scss';
import Map from '../components/Map';
import Label from '../components/Label';

export default function CreateSpot() {
  // list of labels from db
  const [labels, setLabels] = useState([]);

  // FORM DATA HANDLERS
  const [marker, setMarker] = useState([{}]);
  const [formData, setFormData] = useState({ spot: {}, visit: {}, labels: [] });

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

  const labelList = labels.map(label => {
    const isClicked = formData.labels.filter(labelObject => labelObject.label_id === label.id).length > 0;
    return <Label key={'createSpot_' + label.id} active={isClicked} label={label} handleLabelClick={handleLabelClick}/>
  });

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarker([{ lat: lat, lng: lng }]);
    setFormData(prev => ({ ...prev, spot: {lat: lat, lng: lng} }));
  };

  const handleFormChange = (event) => {
    const name = event.target.name;
    setFormData(prev => ({ ...prev, visit: { ...prev.visit, [name]: event.target.value } }));
  };

  useEffect(() => {
    fetch('http://localhost:8080/api/labels')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setLabels(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <div className='one-spot createSpot__container'>

      <div className='createSpot__sideBar'>
        <h1>Create a Spot</h1>
        <form className='createSpot__form'>
          <input className='createSpot__form--element' placeholder='Add Name' id='createSpot__form-id--name' name='name' onChange={handleFormChange} autoComplete='off'></input>
          <div className={`createSpot__form--element createSpot__form--location ${formData.spot.lat && 'createSpot__form--green'}`} >
            Location
            {formData.spot.lat ? <span>✅</span>: <span>Select location on Map</span> }
          </div>
          <input className='createSpot__form--element' type="datetime-local" id='createSpot__form-id--date-time' name='dateTime' onChange={handleFormChange}></input>
          <input className='createSpot__form--element' placeholder='Rating' id='createSpot__form-id--rating'></input>
          <textarea className='createSpot__form--element' type="text" rows='3' maxLength="250" placeholder='Description' autoComplete='off' id='createSpot__form-id--description' name='description' onChange={handleFormChange}></textarea>
          <input className='createSpot__form--element' placeholder='Image Upload' id='createSpot__form-id--image'></input>
          <div className='label__container'>
            {labelList}
          </div>
          <button className='createSpot__btn--submit'>Submit</button>
        </form>
      </div>

      <div className='createSpot__map'>
        <Map spots={marker} borderRadius={true} onMapClick={onMapClick}/>
      </div>

    </div>
  );
}