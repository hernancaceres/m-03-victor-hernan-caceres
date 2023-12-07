import express from "express";
import { authRequired } from "../middlewares/auth.jwt.js";
import {
  createComment,
  getAllComments,
  updateComment,
  deleteComment,
  getCommentsByPostId,
} from "../controllers/comment.controller.js";

const commentRouter = express.Router();

// Ruta para crear un nuevo comentario
commentRouter.post("/comment/:postId", authRequired, createComment);

// Ruta para obtener todos los comentarios
commentRouter.get("/comments", authRequired, getAllComments);

// Ruta para obtener comentarios por ID de post
commentRouter.get('/comment/:postId', getCommentsByPostId);

// Ruta para actualizar un comentario
commentRouter.put("/comment/:commentId", authRequired, updateComment);

// Ruta para eliminar un comentario
commentRouter.delete("/comment/:commentId", authRequired, deleteComment);

export default commentRouter;

