import { createBrowserRouter } from "react-router";
import PublicRoutes from "./PublicRoutes";
import AuthLayout from "../layout/AuthLayout";
import LoginPage from "../module/auth/LoginPage";
import Register from "../module/auth/Register";
import ProtectedRoutes from "./ProtectedRoutes";
import MainLayout from "../layout/MainLayout";
import Home from "../module/main/Home";
import Shop from "../module/main/Shop";
import Cart from "../module/main/Cart";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicRoutes />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            index:true,
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <Register />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "shop",
            element: <Shop />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
        ],
      },
    ],
  }
]);

export default router