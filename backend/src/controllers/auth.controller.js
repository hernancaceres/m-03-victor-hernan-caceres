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

        const newUser = new User({ username, email, password: hashedPassword});

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
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie("token", token);
        res.json({
            message: "Usuario registrado con éxito",
            id: userSaved.id,
            username: userSaved.username,
            email: userSaved.email,
            
        });

        // res.status(200).json(userSaved);
    } catch (error) {
        res.status(500).json({ message: "Error al registrar al Usuario", error });
    }
};

//LOGIN  
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        //buscamos el usuario en la base de datos en base al emali ingresado por el usuario
        const userFound = await User.findOne({ email });

        //VERIFICAMOS EL EMAIL
        if (!userFound)
            return res.status(400).json({ message: "El usuario no esta registrado" });
        const matchPassword = await bcrypt.compare(password, userFound.password);

        //VERIFICAMOS EL PASSWORD
        if (!matchPassword) {
            return res.status(400).json({ message: "Password incorrecto", token: null });
        } else {

            //generamos el token nuevamento por si expiró
            const token = await createAccessToken({ id: userFound._id });
            res.cookie("token", token);
            res.json({
                message: "Bienvenido!",
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