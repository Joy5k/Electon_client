import {  useState } from "react";
import DashboardNav from "./DashboardNav";
import DashboardSiteBar from "./DashboardSiteBar";
import DashboardContent from "./DashboardContent";
import { useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

function Dashboard() {
    const [activePage, setActivePage] = useState<string>('Overview');
    const navigate=useNavigate()
    const token=localStorage.getItem("token") as string;
    const decoded=verifyToken(token) as {role:string}
    if(decoded.role!=="seller"){
     return navigate("/")

    }
 
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