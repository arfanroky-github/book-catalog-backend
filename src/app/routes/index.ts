import { UserRoutes } from "@/modules/user/user.route";
import express, { Router } from "express";
import { BookRoutes } from "../modules/book/book.route";
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
  {
    path: "/book",
    route: BookRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export const AppRoutes = router;
