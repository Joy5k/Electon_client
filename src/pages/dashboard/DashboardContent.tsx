import React from 'react';
import Overview from './dashboardComponents/Overview';

type DashboardContentProps = {
  activePage: string;
};

const DashboardContent: React.FC<DashboardContentProps> = ({ activePage }) => {
  return (
    <div className="flex-1 px-8">
      {activePage === 'Overview' && <div><Overview></Overview></div>}
      {activePage === 'Products' && <div>Manage your Settings here.</div>}
      {activePage === 'Users' && <div>View and edit your Profile.</div>}
    </div>
  );
};

export default DashboardContent;
