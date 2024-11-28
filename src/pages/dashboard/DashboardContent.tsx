import React from 'react';
import Overview from './dashboardComponents/Overview';
import ProductManagement from './dashboardComponents/ProductManagement';
import UsersManagement from './dashboardComponents/UsersManagement';
import MyProducts from './sellerDashboard/myProducts/MyProducts';
import SellsProducts from './dashboardComponents/sellsProducts/SellsProducts';
import SellerOverview from './sellerDashboard/sellerDashboardOverview/SellerOverview';

type DashboardContentProps = {
  activePage: string;
};

const DashboardContent: React.FC<DashboardContentProps> = ({ activePage }) => {
  return (
    <div className="flex-1 pr-5">
      {activePage === 'Overview' && <div><Overview></Overview></div>}
      {activePage === 'Products' && <div className="w-full md:w-10/12 lg:w-11/12"><ProductManagement></ProductManagement></div>}
      {activePage === 'Users' && <div><UsersManagement></UsersManagement></div>}
      {activePage === 'My-Products' && <div><MyProducts></MyProducts></div>}
      {activePage === 'Sells' && <div className="w-full md:w-10/12 lg:w-11/12"><SellsProducts></SellsProducts></div>}
      {activePage === 'seller-overview' && <div><SellerOverview></SellerOverview></div>}
    </div>
  );
};

export default DashboardContent;
