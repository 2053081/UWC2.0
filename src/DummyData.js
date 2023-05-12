import {
  faTruck,
  faMapLocation,
  faRoute,
  faListCheck,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export const adminNavItems = [
  {
    name: "Users",
    icon: faUsers,
    isActive: true,
  },
  {
    name: "Vehicles",
    icon: faTruck,
    isActive: false,
  },
  {
    name: "MCPs",
    icon: faMapLocation,
    isActive: false,
  },
  {
    name: "Optimized Routes",
    icon: faRoute,
    isActive: false,
  },
  {
    name: "Tasks Assignment",
    icon: faListCheck,
    isActive: false,
  },
];

export const employeeNavItems = [
  {
    name: "My tasks",
    icon: faListCheck,
    isActive: true,
  },
  {
    name: "Optimized Routes",
    icon: faRoute,
    isActive: false,
  },
];

export const usersInfoDir = [
  "ID Number",
  "Full Name",
  "Email Address",
  "Phone Number",
  "Role",
  "Status",
];

export const vehiclesInfoDir = [
  "License Plate",
  "Vehicle Name",
  "Vehicle Type",
  "Vehicle's Insurer",
  "Active Area",
  "Status",
];
