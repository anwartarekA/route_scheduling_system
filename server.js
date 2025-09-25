const mongoose = require("mongoose");
const dotEnv = require("dotenv");
dotEnv.config({ path: "./config.env" });
const app = require("./app");
const port = 5000;
const DB = process.env.DATABASE_CONNECTION_STRING.replace(
  "<PASSWORD>",
  process.env.DATABASE_CONNECTION_PASSWORD
);
mongoose
  .connect(DB)
  .then(() => {
    console.log("connected to database succeffully ✅");
  })
  .catch((err) => {
    console.log("ERROR 💥:", err);
  });
app.listen(port, "127.0.0.1", () => {
  console.log(`Server is running oh port ${port}`);
});
