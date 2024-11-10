import React from 'react';

type DashboardContentProps = {
  activePage: string;
};

const DashboardContent: React.FC<DashboardContentProps> = ({ activePage }) => {
  return (
    <div className="flex-1 p-8">
      {activePage === 'Overview' && <div>Welcome to the Home page!</div>}
      {activePage === 'Products' && <div>Manage your Settings here.</div>}
      {activePage === 'Users' && <div>View and edit your Profile.</div>}
    </div>
  );
};

export default DashboardContent;
