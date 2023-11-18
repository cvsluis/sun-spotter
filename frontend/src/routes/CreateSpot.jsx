import { useState, useEffect } from 'react';
import '../styles/CreateSpot.scss';
import '../styles/Label.scss';
import Map from '../components/Map';
import Label from '../components/Label';

export default function CreateSpot() {
  const [labels, setLabels] = useState([]);

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

  const labelList = labels.map(label => {
    return <Label key={label.id} name={label.name} active={false}/>
  });

  const [marker, setMarker] = useState([{}]);
  const [formData, setFormData] = useState({});

  const onMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    setMarker([{ lat: lat, lng: lng }]);
    setFormData(prev => ({ ...prev, lat: lat, lng: lng }));
  };

  const handleFormChange = (event) => {
    const name = event.target.name;
    setFormData(prev => ({ ...prev, [name]: event.target.value }));
  };

  return (
    <div className='one-spot createSpot__container'>

      <div className='createSpot__sideBar'>
        <h1>Create a Spot</h1>
        <form className='createSpot__form'>
          <input className='createSpot__form--element' placeholder='Add Name' name='spotName' onChange={handleFormChange} autoComplete='off'></input>
          <div className={`createSpot__form--element createSpot__form--location ${formData.lat && 'createSpot__form--green'}`} >
            Location
            {formData.lat ? <span>✅</span>: <span>Select location on Map</span> }
          </div>
          <input className='createSpot__form--element' type="datetime-local"></input>
          <input className='createSpot__form--element' placeholder='Rating'></input>
          <textarea className='createSpot__form--element' type="text" rows='3' maxLength="250" placeholder='Description' autoComplete='off'></textarea>
          <input className='createSpot__form--element' placeholder='Image Upload'></input>
          <div className='label__container'>
            {labelList}
          </div>
          <button className='createSpot__btn--submit'>Submit</button>
        </form>
      </div>

      <div className='createSpot__map'>
        <Map spots={marker} handlePinClick={null} borderRadius={true} onMapClick={onMapClick}/>
      </div>

    </div>
  );
}