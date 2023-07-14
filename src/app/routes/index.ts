import { UserRoutes } from "@/modules/user/user.route";
import express, { Router } from "express";
const router = express.Router();

type RouteType = {
  path: string;
  route: Router;
};

const moduleRoutes: RouteType[] = [
  {
    path: "/auth",
    route: UserRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const AppRoutes = router;
