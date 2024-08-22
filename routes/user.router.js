import { Router } from "express";
import userMiddleWare from "../middlewares/user.middleware.js";
import userController from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.post(
  "/register",
  userMiddleWare.validateCreateUser,
  userController.register
);

userRouter.post(
  "/login",
  userMiddleWare.validateCreateUser,
  userController.login
);
export default userRouter;
