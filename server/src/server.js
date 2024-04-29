import app from "./app.js";
import * as dotenv from "dotenv";
import routes from "./routes";
import { multerUpload } from "./config/multer.js";
import { uploadFile } from "./app/utils/uploadFile.js";

dotenv.config();
const port = process.env.PORT || 3334;

app.use(routes);

app.post("/", multerUpload.single("file"), (req, res) => {
  uploadFile({
    file: req.file,
    folder: "profile-images",
  });

  res.json(true);
});

app.listen(port, () => {
  console.log("Server listening on http://localhost/:" + port);
});
