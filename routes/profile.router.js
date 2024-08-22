import { Router } from "express";
import profileMiddleWare from "../middlewares/profile.middleware.js";
import profileController from "../controllers/profile.controller.js";
import userMiddleWare from "../middlewares/user.middleware.js";

const profileRouter = Router();

profileRouter.post(
  "/add-profile",
  userMiddleWare.isAuthenticated,
  profileController.createProfile
);

profileRouter.get(
  "/get-profile",
  userMiddleWare.isAuthenticated,
  profileController.getProfile
);

profileRouter.put(
  "/change-profile",
  profileMiddleWare.validateProfile,
  profileController.changeProfile
);

profileRouter.delete(
  "/delete-profile",
  profileMiddleWare.validateProfile,
  profileController.deleteProfile
);

export default profileRouter;
