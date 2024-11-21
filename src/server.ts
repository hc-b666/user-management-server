import "dotenv/config";
import mongoose from "mongoose";
import env from "./utils/validateEnv";
import app from "./app";

const PORT = env.PORT;

mongoose.connect(env.MONGODB_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch(console.error);
