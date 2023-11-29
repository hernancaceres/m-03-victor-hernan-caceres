import Comment from "../models/comment.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";

// CREAR UN COMENTARIO
export const createComment = async (req, res) => {
  try {
    const { autor, description } = req.body;
    const postId = req.params.postId;  // Supongamos que recibes el ID del post en los parámetros de la ruta

    // Verifica si el autor (usuario) existe antes de crear el comentario
    const existingUser = await User.findById(autor);
    if (!existingUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Crea el nuevo comentario con la referencia al post
    const newComment = new Comment({ autor, description, post: postId });

    // Guarda el comentario en la base de datos
    const commentSaved = await newComment.save();

    // Actualiza el array de comentarios en el post
    await Post.findByIdAndUpdate(postId, { $push: { comments: commentSaved._id } });

    res.status(201).json(commentSaved);
  } catch (error) {
    console.error("Error al crear un nuevo comentario:", error);
    res.status(400).json({ message: "Error al crear un nuevo comentario", error });
  }
};

// obtener todos los comentarios
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.json(comments);
  } catch (error) {
    console.error("Error al obtener todos los comentarios:", error);
    res.status(500).json({ message: "Error al obtener todos los comentarios", error });
  }
};

//Actualizar comentarios:
export const updateComment = async (req, res) => {
  try {
    const { description } = req.body;
    const commentId = req.params.commentId;

    // Actualiza el comentario
    const updatedComment = await Comment.findByIdAndUpdate(commentId, { description }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    res.json(updatedComment);
  } catch (error) {
    console.error("Error al actualizar el comentario:", error);
    res.status(500).json({ message: "Error al actualizar el comentario", error });
  }
};

//Eliminar comentarios:
export const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.commentId;

    // Elimina el comentario
    const deletedComment = await Comment.findByIdAndDelete(commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comentario no encontrado" });
    }

    // Elimina la referencia al comentario en el post
    const postId = deletedComment.post;
    await Post.findByIdAndUpdate(postId, { $pull: { comments: commentId } });

    res.json({ message: "Comentario eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el comentario:", error);
    res.status(500).json({ message: "Error al eliminar el comentario", error });
  }
};
