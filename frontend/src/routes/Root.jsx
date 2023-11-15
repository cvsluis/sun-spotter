import { Outlet } from "react-router-dom";
import TopNavBar from "../components/TopNavBar";

export default function Root () {
  return (
    <div>
      <TopNavBar />
    
      <main>
        <Outlet />
      </main>
    </div>
  );
}
