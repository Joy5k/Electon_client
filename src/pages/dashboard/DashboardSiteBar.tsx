import React, { useEffect, useState } from 'react';
import { FiMenu } from 'react-icons/fi';
import { verifyToken } from '../../utils/verifyToken';
import { useNavigate } from 'react-router-dom';

type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const DashboardSiteBar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const navigate=useNavigate()
  const authToken=localStorage.getItem("token")
  const [siteBarItems,setSiteBarItems]=useState<string[]>([])
  const [isOpen, setIsOpen] = useState(false);
  
  const super_adminSiteBar = ['Overview', 'Products', 'Users'];
  const sellerSiteBar = ['My-Products', 'Sells', 'seller-overview'];

    if(!authToken){
     navigate("/login") 
   }
 
  const {role}=verifyToken(authToken!) as {role:string}

 
// setting sitebar item name
useEffect(()=>{


  if(role==="super_admin"){
    setSiteBarItems(super_adminSiteBar)
  } else if(role==="seller"){
    setSiteBarItems(sellerSiteBar)
  }

},[role])

  return (
    <div className="relative">
      {/* Hamburger menu icon for small screens */}
      <button
        className="text-white p-4 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FiMenu size={24} />
      </button>

      {/* Sidebar */}
      <div
        className={`absolute md:relative bg-transparent text-white p-4 space-y-4 transition-all duration-300 ${
          isOpen ? 'block' : 'hidden'
        } md:block w-44`}
      >
        {siteBarItems.map((page) => (
          <button
            key={page}
            className={`block w-full text-left p-2 rounded ${
              activePage === page ? 'bg-primary' : 'bg-gray-900'
            }`}
            onClick={() => {
              setActivePage(page);
              setIsOpen(false); // Close sidebar after selecting a page on small screens
            }}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardSiteBar;
