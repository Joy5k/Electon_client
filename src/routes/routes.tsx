import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/layout/MainLayout";
import Register from "../pages/Register";
import Login from "../pages/Login";
import About from "../pages/About";
import HomePage from "../pages/Home";
import Booking from "../pages/Booking";
import Checkout from "../pages/CheckOut";

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
        path: "about",
        element: <About />
      },
      {
        path: "booking",
        element: <Booking />
      },
      {
        path: "checkout",
        element: <Checkout />
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
  }
]);

export default router;
