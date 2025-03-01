import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";

const Home = React.lazy(() => import("../../../modules/student/home"));
const MyClub = React.lazy(() => import("../../../modules/student/myClub"));
const ClubDetail = React.lazy(() => import("../../../modules/guest/clubDetail"));
const Explore = React.lazy(() => import("../../../modules/student/explore"));
export const studentConfig = [
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: "/student",
    element: <Home />,
  },
  {
    permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
    path: "/my-club",
    element: <MyClub />,
  },
  {
      permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
      path: "/student/club/:id",
      element: <ClubDetail />,
  },
  {
      permittedRole: [RoutePermittedRole.User, RoutePermittedRole.Admin],
      path: "/studentExplore",
      element: <Explore />,
    },
];