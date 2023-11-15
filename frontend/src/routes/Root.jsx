import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

export default function Root () {
  return (
    <div className ="root-layout">
      <header>
      <TopNavBar />
      </header>
    
      <main>
        <Outlet />
      </main>
    </div>
  );
}
