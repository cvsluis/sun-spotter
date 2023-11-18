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

  return (
    <div className='one-spot createSpot__container'>

      <div className='createSpot__sideBar'>
        <h1>Create a Spot</h1>
        <form className='createSpot__form'>
          <input className='creatSpot__form--element' placeholder='Add Name'></input>
          <input className='creatSpot__form--element' placeholder='Location'></input>
          <input className='creatSpot__form--element' type="datetime-local"></input>
          <input className='creatSpot__form--element' placeholder='Rating'></input>
          <textarea className='creatSpot__form--element' type="text" rows='3' maxLength="250" placeholder='Description'></textarea>
          <input className='creatSpot__form--element' placeholder='Image Upload'></input>
          <div className='label__container'>
            {labelList}
          </div>
          <button className='createSpot__btn--submit'>Submit</button>
        </form>
      </div>

      <div className='createSpot__map'>
        <Map spots={[]} handlePinClick={null} borderRadius={true}/>
      </div>

    </div>
  );
}