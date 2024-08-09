import { Outlet } from "react-router-dom"
import Navbar from "../navbar/Navbar"
import Footer from "../footer/Footer"

const MainLayout=()=>{
    return(
        <div>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
        </div>
    )
}
export default MainLayout