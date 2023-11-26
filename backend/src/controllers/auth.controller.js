import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../middlewares/jwt.validator.js";
//BUSCAR TODOS LOS USUARIOS

export const getAllUsuarios = async (req, res) => {
    const usuarios = await User.find();
    res.json(usuarios);
};

//metodos de singup (para registrar un usuario) 

export const register = async (req, res) => {
    const { username, email, password, avatarURL } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); //encriptamos la contraseña

        const newUser = new User({ username, email, password: hashedPassword, avatarURL });

        //Guardamos al registro de user
        const userSaved = await newUser.save();

        //Generamos el Token

        //TOKEN: forma 1:
        // jwt.sign(
        //   { id: userSaved._id },
        //   "proyectoBd",
        //   { expiresIn: "1h" },
        //   (err, token) => {
        //     if (err) console.log(err);
        //     res.cookie("token", token);
        //     console.log(token);
        //     res.json(userSaved);
        //   }
        // );
        //TOKEN: forma 2:

        const token = await createAccessToken({ id: userSaved._id });
        res.cookie("token", token);
        res.json({
            message: "Usuario registrado con éxito",
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            avatarURL: userSaved.avatarURL,
        });

        // res.status(200).json(userSaved);
    } catch (error) {
        res.status(500).json({ message: "Error al registrar al Usuario", error });
    }
};

/* //LOGIN  
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        //VERIFICAMOS EL EMAIL
        if (!user)
            return res.status(400).json({ message: "El usuario no esta registrado" });

        const verifiedPassword = await User.comparePassword(password, user.password);

        //VERIFICAMOS EL PASSWORD
        if (!verifiedPassword) {
            return res
                .status(400)
                .json({ message: "Password incorrecto", token: null });
        } else {

            //generamos el token
            const token = jwt.sign({ id: user._id }, settingSecretToken().secret, {
                expiresIn: "1h",
            });
            return res
                .status(200)
                .json({ message: "El Usuario ingreso con exito", token });
        }
    } catch (error) {
        return res.status(400).json({ message: "Error en el inicio de sesión" });
    } 
};
*/