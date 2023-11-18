import '../styles/CreateSpot.scss';
import Map from '../components/Map';

export default function CreateSpot() {
  return (
    <div className='one-spot createSpot__container'>

      <div className='createSpot__sideBar'>
        <h1>Create a Spot</h1>
        <form className='creatSpot__form'>
          <input className='creatSpot__form--element' placeholder='Add Title'></input>
          <input className='creatSpot__form--element' placeholder='Location'></input>
          <input className='creatSpot__form--element' type="datetime-local"></input>
          <input className='creatSpot__form--element' placeholder='Rating'></input>
          <textarea className='creatSpot__form--element' type="text" rows='3' maxlength="250" placeholder='Description'></textarea>
          <input className='creatSpot__form--element' placeholder='Image Upload'></input>
        </form>
      </div>

      <div className='createSpot__map'>
        <Map spots={[]} handlePinClick={null} borderRadius={true}/>
      </div>

    </div>
  );
}