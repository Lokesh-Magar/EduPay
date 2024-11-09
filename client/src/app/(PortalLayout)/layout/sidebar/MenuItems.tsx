import {
  IconAperture,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconUserPlus,
  IconUsersPlus,
  IconListDetails,
  IconBoxMultiple0,
  IconFileTypography,
  IconFileInvoice,
  IconBabyCarriage,
  IconBuildingBank,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";
// import Login from "../../../../views/login/login"; // Adjust the path as necessary to import the Login component

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Portal",
    icon: IconLayoutDashboard,
    href: "/portal",
  },
  
  {
    navlabel: true,
    subheader: "Fees",
  },
  {
    id: uniqueId(),
    title: "Fees Type",
    icon: IconFileTypography,
    href: "/portal/student/feestype",
  },
  {
    id: uniqueId(),
    title: "Fees Group",
    icon: IconBoxMultiple0,
    href: "/portal/student/feesgroup",
  },
  {
    id: uniqueId(),
    title: "Fees Invoice",
    icon: IconFileInvoice,
    href: "/portal/student/feesinvoice",
  },
  {
    id: uniqueId(),
    title: "Fees Carry",
    icon: IconBabyCarriage,
    href: "/portal/student/feescarryforward",
  },
  {
    id: uniqueId(),
    title: "Bank Payment",
    icon: IconBuildingBank,
    href: "/portal/student/bankpayment",
  },
  
  // Uncomment these if needed
  // {
  //   navlabel: true,
  //   subheader: "Extra",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
];

export default Menuitems;
