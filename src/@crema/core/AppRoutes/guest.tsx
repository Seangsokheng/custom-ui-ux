import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";
const Home = React.lazy(() => import("../../../modules/guest"));

export const guestConfig = [
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: "/guest",
    element: <Home />,
  },
  

];