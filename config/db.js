const mongoose = require("mongoose");
mongoose
  .set("strictQuery",true)
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected!"))
  .catch((error) => console.log(error));
