import express from "express";
import { authRequired } from "../middlewares/auth.jwt.js";
import { createComment } from "../controllers/comment.controller.js";

const commentRouter = express.Router();

// Ruta para crear un nuevo comentario
commentRouter.post("/comment", authRequired, createComment);

// Puedes agregar más rutas según tus necesidades, como obtener todos los comentarios, actualizar comentarios, eliminar comentarios, etc.

export default commentRouter;
