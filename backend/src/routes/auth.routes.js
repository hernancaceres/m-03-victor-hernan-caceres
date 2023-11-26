import { Router } from "express";
import { register, getAllUsuarios} from "../controllers/auth.controller.js";


const authRouter = Router();

//REGISTRARCE
authRouter.post("/register", register);

//RUTA PARA BUSCAR TODOS LOS USUARIOS
authRouter.get("/usuarios", getAllUsuarios);


/* //INICIAR SECION
authRouter.post("/login", login); */

export default authRouter