require("dotenv").config();
const app = require("./app");

const database = require("./db/connection");
const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await database();
    app.listen(PORT, (error) => {
      if (error) {
        console.log("Server launch error", error);
        return;
      }
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log("Database launch error", error);
  }
};
startServer()