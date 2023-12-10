import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createAccessToken } from "../middlewares/jwt.validator.js";
import Role from "../models/Role.js";

//BUSCAR TODOS LOS USUARIOS
export const getAllUsuarios = async (req, res) => {
    const usuarios = await User.find();
    res.json(usuarios);
};

//REGISTRO 
export const register = async (req, res) => {
    const { username, email, password, avatarURL, roles } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); //encriptamos la contraseña

        const newUser = new User({ username, email, avatarURL, password: hashedPassword });

        //logica para los roles
        if (roles) {
            const foundRoles = await Role.find({ name: { $in: roles } });
            newUser.roles = foundRoles.map((rol) => rol._id);
        } else {
            const role = await Role.findOne({
                name: "user",
            });
            newUser.roles = [role._id];
        }

        //Guardamos al registro de user
        const userSaved = await newUser.save();

        //Generamos el Token

        //TOKEN: forma 1:
        /*     jwt.sign(
              { id: userSaved._id },
              "proyectoBd",
              { expiresIn: "1h" },
              (err, token) => {
                if (err) console.log(err);
                res.cookie("token", token);
                console.log(token);
                res.json(userSaved);
              }
            ); */
        //TOKEN: forma 2:
        const token = await createAccessToken({ id: userSaved._id, username: userFound.username});
        res.cookie("token", token);
        res.json({
            message: "Usuario registrado con éxito",
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            avatarURL: userSaved.avatarURL

        });

        // res.status(200).json(userSaved);
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            // Si el error es de correo electrónico duplicado, envía un código de estado personalizado
            return res.status(409).json({ message: "El correo electrónico ya está registrado." });
        }

        res.status(500).json({ message: "Error al registrar al Usuario", error });
        console.log(error);
    }
};

//LOGIN  
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Buscamos el usuario en la base de datos en base al email ingresado por el usuario
        const userFound = await User.findOne({ email });

        // Verificamos el email
        if (!userFound)
            return res.status(400).json({ message: "El usuario no está registrado" });

        const matchPassword = await bcrypt.compare(password, userFound.password);

        // Verificamos el password
        if (!matchPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta", token: null });
        } else {
            // Generamos el token nuevamente por si expiró
            const token = await createAccessToken({ id: userFound._id, username: userFound.username });

            res.cookie("token", token, { sameSite: 'None', secure: true, httpOnly: true });
            res.json({
                token,
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Error en el inicio de sesión", error });
    }
};

//Logout de usuario
export const logout = async (req, res) => {
    res.cookie("token", "", { expires: new Date(0) });
    return res.status(200).json({ message: "Hasta Pronto!" });
};

//perfil de usuario
export const profile = async (req, res) => {
    try {
        const userFound = await User.findById(req.user.id);
        if (!userFound)
            return res.status(400).json({ message: "Usuario no encontrado" });

        res.json({
            message: "Perfil",
            id: userFound.id,
            username: userFound.username,
            email: userFound.email,
        });
    } catch (error) {
        res.status(500).json({ message: "Error en el perfil", error });
    }
};