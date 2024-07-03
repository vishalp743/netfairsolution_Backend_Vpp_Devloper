import React from "react";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/tables";
import RTLDefault from "views/rtl/default";
import UserDetails from "views/admin/kycVerification";
import TransactionTracker from "views/admin/trans_history";
import FeedbackForm from "views/admin/Grivience";

// Auth Imports
import SignIn from "views/auth/SignIn";

// Icon Imports
import {
  MdHome,
  MdOutlineShoppingCart,
  MdBarChart,
  MdPerson,
  MdLock,
} from "react-icons/md";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "default",
    icon: <MdHome className="h-6 w-6" />,
    component: <MainDashboard />,
  },
  {
    name: "KYC Verification",
    layout: "/admin",
    path: "kycVerification",
    icon: <MdHome className="h-6 w-6" />,
    component: <UserDetails />,
  },
  {
    name: "Transaction History",
    layout: "/admin",
    path: "transactionhistroy",
    icon: <MdLock className="h-6 w-6" />,
    component: <TransactionTracker />,
  },
  {
    name: "Grivience",
    layout: "/admin",
    path: "Grivience",
    icon: <MdLock className="h-6 w-6" />,
    component: <FeedbackForm />,
  },
  // {
  //   name: "NFT Marketplace",
  //   layout: "/admin",
  //   path: "nft-marketplace",
  //   icon: <MdOutlineShoppingCart className="h-6 w-6" />,
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },
  // {
  //   name: "Data Tables",
  //   layout: "/admin",
  //   icon: <MdBarChart className="h-6 w-6" />,
  //   path: "data-tables",
  //   component: <DataTables />,
  // },
  // {
  //   name: "Profile",
  //   layout: "/admin",
  //   path: "profile",
  //   icon: <MdPerson className="h-6 w-6" />,
  //   component: <Profile />,
  // },
  {
    name: "LogOut",
    layout: "/auth",
    path: "sign-in",
    icon: <MdLock className="h-6 w-6" />,
    component: <SignIn />,
  },

];
export default routes;
