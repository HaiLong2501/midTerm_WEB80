import express from "express";
import mongoose from "mongoose";
import { RootRouterV1 } from "./routes/index.js";
await mongoose.connect(
  "mongodb+srv://longx3732:<password>@learnmongo.0unkttl.mongodb.net/midTerm"
);

const app = express();
app.use(express.json());

app.use("", RootRouterV1);

app.listen(8080, () => {
  console.log("Server is already!");
});
