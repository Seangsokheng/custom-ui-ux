import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";
const Home = React.lazy(() => import("../../../modules/guest"));
const Explore = React.lazy(() => import("../../../modules/guest/explore"));
const ClubDetail = React.lazy(() => import("../../../modules/guest/clubDetail"));

export const guestConfig = [
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: "/",
    element: <Home />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: "/explore",
    element: <Explore />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: "/club/:id",
    element: <ClubDetail />,
  },

  

];