import jwt from "jsonwebtoken";
import { settingSecretToken } from "../config.js";
import User from "../models/user.model.js";


//Funcion token
export const verifyToken = async (req, res, next) => {

    const token = req.headers["x-access-token"];
    try {
        if (!token) {
            return res.status(403).json({ message: "No se envió el token" });

        } else {
            const decoded = jwt.verify(token, settingSecretToken().secret);
            console.log(decoded);
            req.userId = decoded.id;
            const user = await User.findById(req.userId);
            if (!user)
                return res.status(404).json({ message: "No se encontra el Usuario" });
        }

        next();
    } catch (error) {
        return res.status(404).json({ message: "Error general en el TOKEN" });
    }
};

