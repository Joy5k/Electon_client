import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import About from "../pages/About";
import HomePage from "../pages/Home";
import Booking from "../pages/Booking";
import Checkout from "../pages/payment/CheckOut";
import Chat from "../pages/chat/chat";
import Profile from "../pages/profile/profile";
import Dashboard from "../pages/dashboard/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
import Wishlist from "../pages/wishlist/Wishlist";
import ProductDetail from "../pages/productDetails/ProductDetail";
import Category from "../pages/category/Category";
import ContactUs from "../pages/contactUs/ContactUs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,  // Use MainLayout here
    children: [
      {
        path: "/",
        element: <HomePage />
      },
      {
        path: "product/:productId",
        element: <ProductDetail></ProductDetail>
      },
      {
        path: "category",
        element: <Category />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact-us",
        element: <ContactUs />
      },
      {
        path: "booking",
        element:<ProtectedRoute> <Booking /></ProtectedRoute>
      },
      {
        path: "wishlist",
        element: <Wishlist />
      },
      {
        path: "checkout",
        element: <ProtectedRoute><Checkout /></ProtectedRoute>
      },
      {
        path: "chat",
        element: <ProtectedRoute><Chat /></ProtectedRoute>
      },
      {
        path: "profile",
        element: <ProtectedRoute><Profile /></ProtectedRoute>
      },
    
     
     
    ]
  },
  {
    path: "register",
    element: <Register />
  },
  {
    path: "login",
    element: <Login />
  },
  {
    path:"dashboard",
    element:<ProtectedRoute><Dashboard></Dashboard></ProtectedRoute>
  }
]);

export default router;
