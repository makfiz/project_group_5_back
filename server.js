require("dotenv").config();

const mongoose = require("mongoose");

const app = require("./app");
const { HOST_URI, PORT } = require("./config");

mongoose.set("strictQuery", false);

(async function runApp() {
  try {
    await mongoose.connect(HOST_URI);
    console.log("Database connection successful");

    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Server running failed:", error.message);
    process.exit(1);
  }
})();
