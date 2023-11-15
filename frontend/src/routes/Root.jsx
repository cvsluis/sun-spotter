import { Outlet } from "react-router-dom";

export default function Root () {
  return <div class ="root-layout">
    <header>
      page header here
    </header>

    <main>
      <Outlet />
    </main>


  </div>
}