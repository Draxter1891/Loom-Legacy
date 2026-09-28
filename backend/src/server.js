import app from "./app/app.js";
import { connectDB } from "./config/db.config.js";
import { config } from "./config/env.js";

connectDB();

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log("Server is running on", PORT);
});
