import { RoutePermittedRole } from "@crema/constants/AppEnums";
// import Account from "../../../modules/account/MyProfile";
import MyAccountPage from "@crema/components/student/myAccount";
import { Route } from "react-router-dom";

export const accountPagesConfigs = [
  {
    permittedRole: [RoutePermittedRole.User ,RoutePermittedRole.Admin],
    path: "/my-account",
    element: <MyAccountPage />,
  },
];
