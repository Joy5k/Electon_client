import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Login from "../pages/Login";
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
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
]);
export default router;
