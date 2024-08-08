import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
import About from "../pages/About";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  // {
  //   path: "/admin",
  //   element: <App></App>,
  //   children: routeGeneration(adminPath),
  // },

{
  path:"/about",
  element:<About></About>
},
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
]);
export default router;
