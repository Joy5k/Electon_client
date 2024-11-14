import React from 'react';
import Overview from './dashboardComponents/Overview';
import ProductManagement from './dashboardComponents/ProductManagement';
import UsersManagement from './dashboardComponents/UsersManagement';

type DashboardContentProps = {
  activePage: string;
};

const DashboardContent: React.FC<DashboardContentProps> = ({ activePage }) => {
  return (
    <div className="flex-1 px-8">
      {activePage === 'Overview' && <div><Overview></Overview></div>}
      {activePage === 'Products' && <div><ProductManagement></ProductManagement></div>}
      {activePage === 'Users' && <div><UsersManagement></UsersManagement></div>}
    </div>
  );
};

export default DashboardContent;
