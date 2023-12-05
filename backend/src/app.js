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
      res.json({ id: decoded.id, username: decoded.username }); // Ajusta según tu modelo de usuario
    });
  });


app.use("/", indexRoutes);
app.use("/api/", authRouter);
app.use("/api/", postRouter);
app.use("/api/", commentRouter);  // Rutas de comentarios

