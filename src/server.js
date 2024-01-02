import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import app from "./app.js";
import { HOST, PORT, mongoConnection } from "./config/index.js";
const swaggerDocument = YAML.load("./swagger.yaml");

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoConnection();

app.listen(PORT, HOST, () => {
  console.log("Server is running");
});
