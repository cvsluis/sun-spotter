import '../styles/Home.scss';
import sunset from '../assets/sunset.jpg'

export default function Home () {
  return <div>

      <header>
      <img className='header__img' alt="sunset" src={sunset}></img>

      <div className="welcome__section">
        <h4>Welcome, user! It's 2 hours to sunset in Victoria</h4>

        <div className="search__wrapper">
        <form action="/search" method="get">
          <input
            className='search__bar'
            type="text"
            id="search"
            placeholder="Search by city"
          ></input>
        </form>
        </div>
      </div>

      </header>

      <div className='spots__near-user'>
        <h1>Local favourites near Victoria</h1>
      </div>

      <div className='spots__saved'>
        <h1>Your favourites sunset spots</h1>
      </div>
      
    </div>
    
}