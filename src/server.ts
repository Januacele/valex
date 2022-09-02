import app from "./index";
import dotenv from "dotenv";
dotenv.config();

const port = Number(process.env.PORT) || 4003;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}.`);
});