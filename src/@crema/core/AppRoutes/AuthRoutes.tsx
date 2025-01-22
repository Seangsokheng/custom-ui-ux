import React from "react";
const Signin = React.lazy(() => import("../../../modules/auth/Signin"));
const Signup = React.lazy(() => import("../../../modules/auth/Signup"));
const ForgotPassword = React.lazy(
  () => import("../../../modules/auth/ForgetPassword/ForgetPasswordJwtAuth"),
);
const ConfirmSignupAwsCognito = React.lazy(
  () => import("../../../modules/auth/Signup/ConfirmSignupAwsCognito"),
);
const ResetPasswordAwsCognito = React.lazy(
  () => import("../../../modules/auth/ForgetPassword/ResetPasswordAwsCognito"),
);
//const Academy = React.lazy(() => import("../../../modules/dashboards/Academy"));
export const authRouteConfig = [
  {
    path: "/signin",
    element: <Signin />,
  },
  // {
  //     path: "/dashboards/academy",
  //     element: <Academy />,
  // },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/forget-password",
    element: <ForgotPassword />,
  },
  {
    path: "/confirm-signup",
    element: <ConfirmSignupAwsCognito />,
  },
  {
    path: "/reset-password",
    element: <ResetPasswordAwsCognito />,
  },
];
