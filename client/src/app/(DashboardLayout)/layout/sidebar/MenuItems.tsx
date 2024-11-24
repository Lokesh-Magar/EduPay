import {
  IconLayoutDashboard,
  IconUserPlus,
  IconListDetails,
  IconFileTypography,
  IconFileInvoice,
} from "@tabler/icons-react";
import { uniqueId } from "lodash";


const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },
  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/dashboard",
  },
  {
    navlabel: true,
    subheader: "Students",
  },
  {
    id: uniqueId(),
    title: "Add Student",
    icon: IconUserPlus,
    href: "/dashboard/students/addStudent",
  },
  {
    id: uniqueId(),
    title: "Student List",
    icon: IconListDetails,
    href: "/dashboard/students/studentList",
  },
  {
    navlabel: true,
    subheader: "Fees",
  },
  {
    id: uniqueId(),
    title: "Fees Prediction",
    icon: IconFileTypography,
    href: "/dashboard/fees/feestype",
  },

  {
    id: uniqueId(),
    title: "Fees Invoice",
    icon: IconFileInvoice,
    href: "/dashboard/fees/feesinvoice",
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
  // {
  //   id: uniqueId(),
  //   title: "Sample Page",
  //   icon: IconAperture,
  //   href: "/sample-page",
  // },
];

export default Menuitems;
