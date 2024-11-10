import { Link } from "react-router-dom"
import {  Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { useGetUserQuery } from "../../redux/features/userManagement/userManagement"
import Cookies from 'js-cookie';

function DashboardNav() {
    const {data:userData}=useGetUserQuery({})
    const token=localStorage.getItem("token") 
  

  
    const handleSignOut = () => {
      // Remove the refreshToken cookie
      Cookies.remove('refreshToken');
      
      // Remove token from local storage
      localStorage.removeItem('token');
    };
  
  return (
    <div className="p-5">
        <div className="">
            <div className="flex justify-between bg-transparent relative  border-b-2">
                <Link to="/" className="text-primary text-2xl font-bold mx-10 pb-2 bg-transparent">Electon</Link>
               {/* profile navbar section start below */}
                <div className="absolute right-0 top-0 bg-transparent mr-0 md:mr-5 lg:mr-5">
                    <Menu as="div" className="relative ml-3 bg-transparent ">
    <div>
      <MenuButton className="relative flex rounded-full bg-black text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="sr-only hover:text-primary">Open user menu</span>
        <img
          alt=""
          src={userData?.data?.image||"https://media.istockphoto.com/id/1288129985/vector/missing-image-of-a-person-placeholder.jpg?s=612x612&w=0&k=20&c=9kE777krx5mrFHsxx02v60ideRWvIgI1RWzR1X4MG2Y="}
          className="h-8 w-8 rounded-full"
        />
      </MenuButton>
    </div>
    <MenuItems
      transition
      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black border border-gray-700 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
    >
      <MenuItem>
        <a href="/profile" className="block px-4 py-2 text-sm text-white  hover:text-primary">
          Your Profile
        </a>
      </MenuItem>
      <MenuItem>
        <a href="/dashboard" className="block px-4 py-2 text-sm text-white  hover:text-primary ">
          Dashboard
        </a>
      </MenuItem>
      {
        token ?  <MenuItem>
        <a onClick={handleSignOut} href="" className="block px-4 py-2 text-sm text-white  hover:text-primary">
         logout
        </a>
      </MenuItem> : <MenuItem>
        <a href="/login" className="block px-4 py-2 text-sm text-white  hover:text-primary">
         login
        </a>
      </MenuItem>
      }
     
     
    </MenuItems>
                     </Menu>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardNav