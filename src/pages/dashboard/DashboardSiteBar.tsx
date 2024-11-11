import React, { useState } from 'react';
import { FiMenu } from 'react-icons/fi';

type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const DashboardSiteBar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pages = ['Overview', 'Products', 'Users'];

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
        {pages.map((page) => (
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
