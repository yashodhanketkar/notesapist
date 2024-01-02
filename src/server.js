import app from "./app.js";
import { HOST, PORT, mongoConnection } from "./config/index.js";

mongoConnection();

app.listen(PORT, HOST, () => {
  console.log("Server is running");
});
