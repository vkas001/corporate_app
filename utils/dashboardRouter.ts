import type { UserRole } from "@/types/user";

export const getDashboardRoute = (role: UserRole) => {
  switch (role) {
    case "superAdmin":
    case "admin":
      return "/dashboards/(superAdmin)";

    case "producer":
      return "/dashboards/(producer)";

    case "seller":
    default:
      return "/dashboards/(seller)";
  }
};
