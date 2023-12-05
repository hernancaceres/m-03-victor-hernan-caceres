import { Router } from "express";
import { register, getAllUsuarios, login, logout, profile} from "../controllers/auth.controller.js";
import { authRequired} from "../middlewares/auth.jwt.js";
import  { validarUsuario, manejarErroresValidacion } from "../middlewares/user.validations.js";

const authRouter = Router();

//REGISTRARCE
authRouter.post("/register",validarUsuario,manejarErroresValidacion, register);

//RUTA PARA BUSCAR TODOS LOS USUARIOS
authRouter.get("/usuarios", getAllUsuarios);

//INICIAR SECION
authRouter.post("/login", login); 

//Ruta para el Logout
authRouter.post("/logout", logout);

//Rutas para el Perfil

authRouter.get("/profile",authRequired, profile);

export default authRouter