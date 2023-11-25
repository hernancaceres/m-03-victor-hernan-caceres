import {app} from "./app.js";
import { settingDotEnvPort } from "./config/config.js";

const { port } = settingDotEnvPort();

//servidor 
const PORT = port || 5000;
app.listen(PORT, () => {
  console.log(`SERVER corriendo en: http://localhost:${PORT}`);
});