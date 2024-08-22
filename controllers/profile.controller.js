import profileModel from "../models/profile.schema.js";
import userModel from "../models/user.schema.js";

const profileController = {
  createProfile: async (req, res) => {
    try {
      const { userId } = req.query;
      const profile = req.body;
      const crrUser = await userModel.findById(userId);
      const mail = crrUser.email;
      const checkMail = await profileModel.findOne({ email: mail });
      console.log(checkMail);
      if (checkMail) throw new Error("Profile of this user is existed!");
      const createProfile = await profileModel.create({
        ...profile,
        email: crrUser.email,
      });

      if (!crrUser) throw new Error("User is not existed!");
      crrUser.profileId = createProfile._id;
      await crrUser.save();
      res.status(201).send(createProfile);
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },

  getProfile: async (req, res) => {
    try {
      const { profileId } = req.query;
      const profile = await profileModel.findOne({ _id: profileId });
      if (!profile) throw new Error("Profile is not existed!");
      res.status(200).send(profile);
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },

  changeProfile: async (req, res) => {
    try {
      const { profileId } = req.query;
      const profile = await profileModel.findById(profileId);
      if (!profile) throw new error("Profile is not existed!");
      const updatedProfile = await profileModel.findByIdAndUpdate(
        profileId,
        req.body
      );
      res.status(200).send({
        message: "Update successful",
        data: updatedProfile,
      });
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
  deleteProfile: async (req, res) => {
    try {
      const { userId, profileId } = req.query;
      const crrUser = await userModel.findById(userId);
      await profileModel.findByIdAndDelete(profileId);
      crrUser.profileId = null;
      await crrUser.save();
      res.status(200).send("Delete successfully");
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
};

export default profileController;
