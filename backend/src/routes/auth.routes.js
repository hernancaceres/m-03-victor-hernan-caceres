import { Router } from "express";
import { register, getAllUsuarios, login, logout} from "../controllers/auth.controller.js";


const authRouter = Router();

//REGISTRARCE
authRouter.post("/register", register);

//RUTA PARA BUSCAR TODOS LOS USUARIOS
authRouter.get("/usuarios", getAllUsuarios);

//INICIAR SECION
authRouter.post("/login", login); 

//Ruta para el Logout
authRouter.post("/logout", logout);


export default authRouter