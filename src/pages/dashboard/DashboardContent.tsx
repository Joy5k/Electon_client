import React from 'react';
import Overview from './dashboardComponents/Overview';
import ProductManagement from './dashboardComponents/ProductManagement';
import UsersManagement from './dashboardComponents/UsersManagement';
import MyProducts from './sellerDashboard/myProducts/MyProducts';
import SellerOverview from './sellerDashboard/sellerDashboardOverview/SellerOverview';
import { verifyToken } from '../../utils/verifyToken';
import SoldProduct from './dashboardComponents/soldProduct/SoldProduct';
import UploadProduct from './sellerDashboard/productManagement/UploadProduct';
import OfferManagement from './dashboardComponents/allOffers/OfferManagement';

type DashboardContentProps = {
  activePage: string;
};

const DashboardContent: React.FC<DashboardContentProps> = ({ activePage }) => {
  const token=localStorage.getItem("token") as string;
  const decoded=verifyToken(token) as {role:string}

  return (
    <div className="flex-1 pr-5">
     
    {
      decoded.role==="super_admin" && <>
        {activePage === 'Overview' && <div><Overview></Overview></div>}
        </>
    }
   
      {activePage === 'Products' && <div className="w-full md:w-10/12 lg:w-11/12"><ProductManagement></ProductManagement></div>}
      {activePage === 'Users' && <div><UsersManagement></UsersManagement></div>}
      {activePage === 'Discounts' && <div><OfferManagement></OfferManagement></div>}
    
      {
      decoded?.role==="seller" && <>
      {activePage === 'Overview' && <div><SellerOverview></SellerOverview></div>}
      {activePage === 'My-Products' && <div><MyProducts></MyProducts></div>}
      {activePage === 'Sells' && <div ><SoldProduct></SoldProduct></div>}
      {activePage === 'Seller-overview' && <div><SellerOverview></SellerOverview></div>}
      {activePage === 'Upload' && <div><UploadProduct></UploadProduct></div>}
        </>
      }
    </div>
  );
};

export default DashboardContent;
