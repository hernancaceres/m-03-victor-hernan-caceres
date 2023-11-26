import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config/config.js";

const { secret } = settingSecretToken();

export const createAccessToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: "1h" }, (err, token) => {
      err ? reject(err) : resolve(token);
      // if (err) reject(err);
      // resolve(token);
    });
  });
};