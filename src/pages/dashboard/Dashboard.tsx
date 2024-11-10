import React,{ useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSiteBar from "./DashboardSiteBar";
import DashboardContent from "./DashboardContent";

function Dashboard() {
    const [activePage, setActivePage] = useState<string>('Overview');

    return (
      <div className="h-screen flex flex-col">
        <DashboardNav />
        <div className="flex flex-1">
          <DashboardSiteBar activePage={activePage} setActivePage={setActivePage} />
          <DashboardContent activePage={activePage} />
        </div>
      </div>
    );
}

export default Dashboard