import { Router } from "express";
import userRouter from "./user.router.js";
import profileRouter from "./profile.router.js";

const RootRouterV1 = Router();

RootRouterV1.use("/user", userRouter);

RootRouterV1.use("/user/profile", profileRouter);

export { RootRouterV1 };
