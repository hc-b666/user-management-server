import "dotenv/config";
import env from "./utils/validateEnv";
import app from "./app";
import dbConnection from "./config/dbConnection";

const PORT = env.PORT;

dbConnection();

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
