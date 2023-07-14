import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import SignUp from "@/pages/SignUp";
import NotFound from "@/pages/NotFound";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
