import profileModel from "../models/profile.schema.js";
import userModel from "../models/user.schema.js";
const profileMiddleWare = {
  validateProfile: async (req, res, next) => {
    try {
      const { userId, profileId } = req.query;
      const profile = await profileModel.findById(profileId);
      if (!profile) throw new Error("Profile is not existed!");
      const user = await userModel.findById(userId);
      if (user.profileId.toString() !== profile._id.toString()) {
        throw new Error("You are not the owner of this profile");
      }
      console.log("object");
      next();
    } catch (error) {
      res.status(400).send({
        message: error.message,
        data: null,
      });
    }
  },
};
export default profileMiddleWare;
