import mongoose from "mongoose";
import { settingDotEnvDb } from "../config/config.js";

const { db } = settingDotEnvDb();


export const connectMongo = async () => {
  try {
    await mongoose.connect(db.localhost);
    console.log("Base de Datos Conectada");
  } catch (error) {
    console.log("Error al conectarse a la Base de Datos");
  }
};


/* mongoose
  .connect(db.host)
  .then((db) => console.log("Base de datos conectada"))
  .catch((err) => console.log("Error al conectarse a Mongodb")); */
