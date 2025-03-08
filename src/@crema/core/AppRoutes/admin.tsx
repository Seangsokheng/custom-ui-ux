import React from "react";
import { RoutePermittedRole } from "@crema/constants/AppEnums";

const Home = React.lazy(() => import("../../../modules/admin/dashboard"));
const UserManagement = React.lazy(() => import("../../../modules/admin/userManagement"));
const ClubManagers = React.lazy(() => import("../../../modules/admin/clubManager"));
const Explore = React.lazy(() => import("../../../modules/student/explore"));
export const adminConfig = [
  {
    permittedRole: [ RoutePermittedRole.Admin],
    path: "/admin/dashboard",
    element: <Home />,
  },
  {
    permittedRole: [ RoutePermittedRole.Admin],
    path: "/admin/manage-users",
    element: <UserManagement />,
  },
  {
      permittedRole: [ RoutePermittedRole.Admin],
      path: "/admin/club-managers",
      element: <ClubManagers />,
  },
];