import { RouterProvider } from "react-router";
import router from "./routers";

const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;
