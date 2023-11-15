export default function Home () {
  return <div>

      <div className="welcome-section">
        <img alt="sunset" src={process.env.PUBLIC_URL + "/sunset.jpeg"}></img>

        <h4>Welcome, user! It's 2 hours to sunset in Victoria</h4>

        <form action="/search" method="get">
          <input
            type="text"
            id="search"
            placeholder="Search by city"
          ></input>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className='spots-near-user'>
      </div>

      <div className='saved-spots'>
      </div>
      
    </div>
    
}