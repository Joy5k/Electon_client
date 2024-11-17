import { useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSiteBar from "./DashboardSiteBar";
import DashboardContent from "./DashboardContent";

function Dashboard() {
    const [activePage, setActivePage] = useState<string>('Overview');

    return (
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1">
        <div className="">  <DashboardSiteBar  activePage={activePage} setActivePage={setActivePage} /></div>
          <div  >
          <DashboardContent activePage={activePage} />
          </div>
        </div>
      </div>
    );
}

export default Dashboard