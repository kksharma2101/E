import app from "./app.js";
import colors from "colors";

const PORT = process.env.PORT || 9090;

app.listen(PORT, () => {
  console.log(`Server is runing on ${PORT}`.green);
});
