import React from 'react';

type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const DashboardSiteBar: React.FC<SidebarProps> = ({ activePage, setActivePage }) => {
  const pages = ['Overview', 'Products', 'Users'];

  return (
    <div className="w-44 bg-transparent text-white px-4 space-y-4">
      {pages.map((page) => (
        <button
          key={page}
          className={`block w-full text-left p-2 rounded ${
            activePage === page ? 'bg-primary' : 'bg-gray-900'
          }`}
          onClick={() => setActivePage(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default DashboardSiteBar;
