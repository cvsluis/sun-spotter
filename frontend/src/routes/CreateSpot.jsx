import '../styles/CreateSpot.scss';
import Map from '../components/Map';

export default function CreateSpot() {
  return (
    <div className='one-spot createSpot__container'>

      <div className='createSpot__sideBar'>
        <h1>Create a Spot</h1>
        <form>
        </form>
      </div>

      <div className='createSpot__map'>
        <Map spots={[]} handlePinClick={null} borderRadius={true}/>
      </div>

    </div>
  );
}