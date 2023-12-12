import express from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import { connectMongo } from "./database/db.js";
import { indexRoutes } from "./routes/index.routes.js";
import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import commentRouter from "./routes/comment.routes.js";  // Nombre del archivo de rutas de comentarios
import { createRoles } from "./initial.setup.js";



export const app = express();
connectMongo();
createRoles();


app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(morgan("dev"));



app.use(cors({
    origin: 'http://localhost:5173',  // Reemplaza con la URL de tu aplicación de React
    credentials: true,
}));



// Endpoint para verificar el token
app.get('/api/verifyToken', (req, res) => {
    const token = req.headers.authorization?.replace('Bearer ', '');
  
    if (!token) {
      return res.status(401).json({ message: 'Token no proporcionado' });
    }
  
    // Verificar el token
    jwt.verify(token, "argentinaprograma4.0", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: 'Token inválido' });
      }
  
      
      // Enviar información del usuario
      console.log('Decoded token:', decoded);
      res.json({ id: decoded.id, username: decoded.username, avatarURL: decoded.avatarURL }); // Ajusta según tu modelo de usuario
    });
    
  });
// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Error interno del servidor');
});



app.use("/", indexRoutes);
app.use("/api/", authRouter);
app.use("/api/", postRouter);
app.use("/api/", commentRouter);  // Rutas de comentarios






// import express from "express";
// import morgan from "morgan";
// import cors from "cors";
// import helmet from "helmet";
// import jwt from 'jsonwebtoken';
// import cookieParser from "cookie-parser";
// import { connectMongo } from "./database/db.js";
// import { indexRoutes } from "./routes/index.routes.js";
// import authRouter from "./routes/auth.routes.js";
// import postRouter from "./routes/post.routes.js";
// import commentRouter from "./routes/comment.routes.js";  // Nombre del archivo de rutas de comentarios
// import { createRoles } from "./initial.setup.js";

// import path from "path";
// import { fileURLToPath } from 'url';
// import { dirname } from 'path';

// // Obtén la ruta del directorio del módulo
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);


// export const app = express();
// connectMongo();
// createRoles();


// app.use(cookieParser());
// app.use(helmet());
// app.use(express.json());
// app.use(morgan("dev"));


// app.use(cors({
//     origin: 'http://localhost:5173',  // Reemplaza con la URL de tu aplicación de React
//     credentials: true,
// }));

// /* app.use(cors({
//   origin: 'http://localhost:5173',
//   credentials: true,
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   allowedHeaders: "Content-Type,Authorization",
// })); */




// // Endpoint para verificar el token
// app.get('/api/verifyToken', (req, res) => {
//     const token = req.headers.authorization?.replace('Bearer ', '');
  
//     if (!token) {
//       return res.status(401).json({ message: 'Token no proporcionado' });
//     }
  
//     // Verificar el token
//     jwt.verify(token, "argentinaprograma4.0", (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: 'Token inválido' });
//       }
  
      
//       // Enviar información del usuario
//       console.log('Decoded token:', decoded);
//       res.json({ id: decoded.id, username: decoded.username, avatarURL: decoded.avatarURL }); // Ajusta según tu modelo de usuario
//     });
    
//   });
// // Middleware para manejar errores
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Error interno del servidor');
// });


// app.use('/imagenes', express.static(path.join(__dirname, 'src', 'imagenes')));

// app.use("/", indexRoutes);
// app.use("/api/", authRouter);
// app.use("/api/", postRouter);
// app.use("/api/", commentRouter);  // Rutas de comentarios
