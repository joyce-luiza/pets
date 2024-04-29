import app from "./app.js";
import * as dotenv from "dotenv";
import routes from "./routes";

dotenv.config();
const port = process.env.PORT || 3334;

app.use(routes);

app.post("/test", (req, res) => {
  res.json(true);
});

app.listen(port, () => {
  console.log("Server listening on http://localhost/:" + port);
});
