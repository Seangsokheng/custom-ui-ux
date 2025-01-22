import { Navigate } from "react-router-dom";

import { authRouteConfig } from "./AuthRoutes";
import Error403 from "../../../modules/errorPages/Error403";
import { errorPagesConfigs } from "./ErrorPagesRoutes";
import { dashBoardConfigs } from "./DashboardsRoutes";
import { accountPagesConfigs } from "./AccountRoutes";


const authorizedStructure = (loginUrl: string) => {
  return {
    fallbackPath: loginUrl,
    unAuthorizedComponent: <Error403 />,
    routes: [
      ...dashBoardConfigs,
      ...accountPagesConfigs,
    ],
  };
};

const publicStructure = (initialUrl: string) => {
  return {
    fallbackPath: initialUrl,
    routes: authRouteConfig,
  };
};
const anonymousStructure = (initialUrl: string) => {
  return {
    routes: errorPagesConfigs.concat([
      {
        path: "/",
        element: <Navigate to={initialUrl} />,
      },
      {
        path: "*",
        element: <Navigate to="/error-pages/error-404" />,
      },
    ]),
  };
};

export { authorizedStructure, publicStructure, anonymousStructure };
