import { createBrowserRouter } from "react-router-dom";
import App from "@/App";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Books from "@/pages/Books";
import BookDetails from "@/pages/BookDetails";
import Signup from "@/pages/Signup";
import EditBook from "@/pages/EditBook";
import AddBook from "@/pages/AddBook";
import WishList from "@/pages/WishList";
import PrivateRoute from "./PrivateRoute";
import ReadList from "@/pages/ReadList";
import PublicRoute from "./PublicRote";
const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/books",
        element: (
          <PrivateRoute>
            <Books />
          </PrivateRoute>
        ),
      },
      {
        path: "/wishlist",
        element: <WishList />,
      },
      {
        path: "/readlist",
        element: <ReadList />,
      },
      {
        path: "/book-details/:id",
        element: <BookDetails />,
      },
      {
        path: "/addbook",
        element: <AddBook />,
      },
      {
        path: "/editbook/:id",
        element: <EditBook />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <PublicRoute>
        <Signup />
      </PublicRoute>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
