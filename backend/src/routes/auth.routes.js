
import { Router } from "express";
import { register, getAllUsuarios, login, logout, profile } from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/auth.jwt.js";
import { validarLogin, validarRegistro, manejarErroresValidacion } from "../middlewares/user.validations.js";
import { verifyToken } from "../controllers/auth.controller.js"; 

/* import multer from "multer";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      const destinationPath = path.join(process.cwd(), "src", "imagenes");
      cb(null, destinationPath);
  },
  filename: function (req, file, cb) {
      const destinationPath = path.join(process.cwd(), "src", "imagenes");
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname).toLowerCase();

    // Verificar si la extensión es válida
    if ([".jpg", ".jpeg"].includes(extension)) {
      const fullPath = path.join(destinationPath, file.fieldname + "-" + uniqueSuffix + extension);
      console.log('Ruta completa del archivo:', fullPath);
      cb(null, file.fieldname + "-" + uniqueSuffix + extension);
    } else {
      cb(new Error("Formato de archivo no válido. Solo se permiten archivos JPG."));
    }
  },
});

export const upload = multer({ storage: storage }); */


const authRouter = Router();


//REGISTRARCE
authRouter.post("/register",validarRegistro,manejarErroresValidacion, register);

//authRouter.post("/register",validarRegistro,manejarErroresValidacion, upload.single("avatarURL"), register);
// REGISTRARCE
/* authRouter.post("/register",validarRegistro,manejarErroresValidacion, (req, res, next) => {
  upload.single("avatarURL")(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Un error ocurrió durante la carga de Multer
      return res.status(500).json({ message: "Error de carga de archivo", error: err });
    } else if (err) {
      // Otro tipo de error
      return res.status(500).json({ message: "Error inesperado", error: err });
    }

    // Continuar con la lógica de registro
    register(req, res, next);
  });
}); */

//RUTA PARA BUSCAR TODOS LOS USUARIOS
authRouter.get("/usuarios", getAllUsuarios);

//INICIAR SECION
authRouter.post("/login", validarLogin, manejarErroresValidacion, login);

//Ruta para el Logout
authRouter.post("/logout", logout);

//Rutas para el Perfil

authRouter.get("/profile/:userId", authRequired, profile);



// Ruta para la verificación del token
authRouter.get('/verifyToken', verifyToken, (req, res) => {
  // req.user contendrá la información del usuario después de la verificación del token
  res.json(req.user);
});

export default authRouter