import mongoose from "mongoose";
import userModel from "../models/user.schema.js";

const userMiddleWare = {
  validateCreateUser: (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email) throw new Error("email is required!");
      if (!password) throw new Error("password is required!");
      return next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
  isAuthenticated: async (req, res, next) => {
    try {
      const { userId } = req.query;
      if (!userId) throw new Error("Please log in");
      const user = await userModel.findById(userId);
      console.log("object");
      if (!user) throw new Error("Authorized!");
      next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default userMiddleWare;
