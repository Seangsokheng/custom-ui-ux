import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";

const Home = React.lazy(() => import("../../../modules/student/home"));
const MyClub = React.lazy(() => import("../../../modules/student/myClub"));
const ClubDetails = React.lazy(() => import("../../../modules/student/clubDetail"));
const Explore = React.lazy(() => import("../../../modules/student/explore"));
export const studentConfig = [
  {
    permittedRole: [RoutePermittedRole.User],
    path: "/student",
    element: <Home />,
  },
  {
    permittedRole: [RoutePermittedRole.User],
    path: "/my-club",
    element: <MyClub />,
  },
  {
      permittedRole: [RoutePermittedRole.User],
      path: "/student/club/:id",
      element: <ClubDetails />,
  },
  {
      permittedRole: [RoutePermittedRole.User],
      path: "/studentExplore",
      element: <Explore />,
    },
];