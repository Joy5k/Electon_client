import { Link } from "react-router-dom"
import "./Navbar.css"


const Navbar=()=>{
    return (
        <div>
<header>
  <nav className=" fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
    <ul className="navigation max-w-[90vw] flex flex-wrap justify-between items-center relative mx-auto py-8">
      <Link className="logo" to="/">
        <h3 className="font-bold text-2xl">LOGO</h3>
      </Link>
      <input type="checkbox" id="check" />

      <span className="menu flex [&>li]:pl-8 [&>li>a]:text-center [&>li>a]:relative [&>li>a]:transition [&>li>a]:duration-200 [&>li>a]:ease-in-out [&>li>a]:font-medium [&>li>a]:text-lg">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="#">Projects</Link></li>
        <li><Link to="#">Resources</Link></li>
        <li><Link to="#">Contact</Link></li>

        <label htmlFor="check" className="close-menu">X</label>
      </span>

      <label htmlFor="check" className="open-menu">Menu</label>
    </ul>
  </nav>
</header>
        </div>
    )
}

export default Navbar