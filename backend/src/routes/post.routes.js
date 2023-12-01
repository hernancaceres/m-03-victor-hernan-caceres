import { Router } from "express";
import { createPost, deletePostById, getAllPosts, getPostById, updatePost } from "../controllers/post.controller.js";
import { authRequired } from "../middlewares/auth.jwt.js";

export const postRoutes = Router();

// RUTA PARA BUSCAR TODOS LOS POSTS
postRoutes.get("/post", getAllPosts);

// Ruta para obtener un post por ID
postRoutes.get('/post/:postId', getPostById);

// RUTA PARA CREAR UN NUEVO POST
postRoutes.post("/post", authRequired, createPost);

// Ruta para actualizar un post
postRoutes.put("/post/:postId", authRequired, updatePost);

// Ruta para eliminar un post por ID
postRoutes.delete('/post/:postId', deletePostById);


export default postRoutes