<<<<<<< HEAD
import TopNavBar from "../components/TopNavBar";

export default function Root() {
  return (
    <div>
      <TopNavBar />

      <div class="welcome-section">
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

      <div class='spots-near-user'>
      </div>

      <div class='saved-spots'>
      </div>
      
    </div>
  );
}
=======
import { Outlet } from "react-router-dom";

export default function Root () {
  return (
    <div className ="root-layout">
      <header>
        page header here
      </header>
    
      <main>
        <Outlet />
      </main>
    </div>
  );
}
>>>>>>> ed0b7938333ab4e41391ab4f4ef0d26d84241e74
