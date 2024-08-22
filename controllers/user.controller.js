import userModel from "../models/user.schema.js";
import bcrypt from "bcrypt";

const userController = {
  register: async (req, res) => {
    try {
      const { email, password } = req.body;
      const checkMail = await userModel.findOne({ email });
      if (checkMail) throw new Error("Email is existed!");
      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);
      const createUser = await userModel.create({
        email,
        password: hashedPassword,
        profileId: null,
      });

      res.status(201).send(createUser);
    } catch (error) {
      res.status(400).send({
        message: error.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) throw new Error("email is required!");
      if (!password) throw new Error("Password is required!");
      const crrUser = await userModel.findOne({ email });
      const comparedPassword = bcrypt.compareSync(password, crrUser.password);
      if (!comparedPassword) {
        res.status(400).send({
          message: "Email or password is wrong!",
        });
      } else {
        res.status(200).send({
          message: "Đăng nhập thành công",
          data: crrUser,
        });
      }
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
  logout: async (req, res) => {},
};

export default userController;
