import { Router } from "express";
import { register, getAllUsuarios, login, logout, profile} from "../controllers/auth.controller.js";
import { authRequired} from "../middlewares/auth.jwt.js";
import  { validarLogin,validarRegistro, manejarErroresValidacion} from "../middlewares/user.validations.js";

const authRouter = Router();

//REGISTRARCE
authRouter.post("/register",validarRegistro,manejarErroresValidacion, register);

//RUTA PARA BUSCAR TODOS LOS USUARIOS
authRouter.get("/usuarios", getAllUsuarios);

//INICIAR SECION
authRouter.post("/login",validarLogin,manejarErroresValidacion, login); 

//Ruta para el Logout
authRouter.post("/logout", logout);

//Rutas para el Perfil

authRouter.get("/profile/:userId",authRequired, profile);

export default authRouter