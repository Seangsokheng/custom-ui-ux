import { FaRegCalendarAlt, FaRegHospital } from "react-icons/fa";
import { FiMap, FiUsers } from "react-icons/fi";
import { HiOutlineAcademicCap, HiOutlineChartSquareBar } from "react-icons/hi";
import {
  RiCustomerService2Line,
  RiDashboardLine,
  RiFileUploadLine,
  RiShieldUserLine,
  RiTodoLine,
} from "react-icons/ri";
import { BiCarousel, BiCartAlt, BiErrorAlt, BiTask } from "react-icons/bi";
import {
  BsBriefcase,
  BsCart4,
  BsChatDots,
  BsCurrencyBitcoin,
  BsQuestionDiamond,
} from "react-icons/bs";
import { DiHtml5Multimedia } from "react-icons/di";
import {
  MdOutlineAnalytics,
  MdOutlineContactPhone,
  MdOutlineContactSupport,
  MdOutlineDns,
  MdOutlineManageAccounts,
} from "react-icons/md";
import { CgFeed } from "react-icons/cg";
import { GrUserAdmin } from "react-icons/gr";
import { AiOutlineEdit, AiOutlineUnorderedList } from "react-icons/ai";
import { RoutePermittedRole } from "@crema/constants/AppEnums";
import { TbFileInvoice } from "react-icons/tb";

const routesConfig = [
  {
    id: "app",
    title: "Application",
    messageId: "sidebar.application",
    type: "group",
    children: [
      {
        id: "crypto",
        title: "Crypto",
        messageId: "sidebar.app.dashboard.crypto",
        type: "item",
        permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.User],
        icon: <BsCurrencyBitcoin />,
        url: "/dashboards/crypto",
      },
      {
        id: "crm",
        title: "CRM",
        messageId: "sidebar.app.dashboard.crm",
        type: "item",
        permittedRole: [RoutePermittedRole.User],
        icon: <RiCustomerService2Line />,
        url: "/dashboards/crm",
      },
    ],
  },
  {
        id: "error-pages",
        title: "Error Pages",
        messageId: "sidebar.pages.errorPages",
        type: "collapse",
        icon: <BiErrorAlt />,
        children: [
          {
            id: "error-401",
            title: "402",
            messageId: "sidebar.pages.errorPages.401",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            url: "/error-pages/error-401",
          },
          {
            id: "error-403",
            title: "403",
            messageId: "sidebar.pages.errorPages.403",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            url: "/error-pages/error-403",
          },
          {
            id: "error-404",
            title: "404",
            messageId: "sidebar.pages.errorPages.404",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            url: "/error-pages/error-404",
          },
          {
            id: "error-500",
            title: "500",
            messageId: "sidebar.pages.errorPages.500",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            url: "/error-pages/error-500",
          },
          {
            id: "error-503",
            title: "503",
            messageId: "sidebar.pages.errorPages.503",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            url: "/error-pages/error-503",
          },
          {
            // id: "maintenance",
            // title: "Maintenance",
            // messageId: "sidebar.pages.errorPages.maintenance",
            // type: "item",
            permittedRole: [RoutePermittedRole.User],
            url: "/error-pages/maintenance",
          },
          {
            id: "coming-soon",
            title: "Coming Soon",
            messageId: "sidebar.pages.errorPages.comingSoon",
            type: "item",
            permittedRole: [RoutePermittedRole.User],
            url: "/error-pages/coming-soon",
          },
        ],
      },
];
export default routesConfig;
