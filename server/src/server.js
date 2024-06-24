import app from "./app.js";
import * as dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 3335;

app.listen(port, () => {
  console.log("Server listening on PORT:" + port);
});
