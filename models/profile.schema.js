import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  fullName: String,
  dob: String,
  birthPlace: String,
  nationality: String,
  email: String,
  education: [
    {
      degree: String,
      school: String,
      start: String,
      end: String,
    },
  ],
  workExperience: [
    {
      companyName: String,
      role: String,
      start: String,
      end: String,
    },
  ],
  skills: [String],
  projects: [
    {
      name: String,
      content: String,
      role: String,
      start: String,
      end: String,
    },
  ],
});

const profileModel = mongoose.model("profiles", profileSchema);
export default profileModel;
