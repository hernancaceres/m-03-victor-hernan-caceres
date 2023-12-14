import Post from "../models/post.model.js";
import Comment from '../models/comment.js';

/* //BUSCAR TODOS LOS POSTS
export const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
}; */

// Obtener todos los posts con información del autor
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: 'autor',
      select: 'username avatarURL', // Asegúrate de seleccionar el campo 'username'
    });

    res.json(posts);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



/* // Obtener un post por ID
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}; */


// Obtener un post por ID
export const getPostById = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await Post.findById(postId).populate({
      path: 'autor',
      select: 'username avatarURL', // Asegúrate de seleccionar el campo 'username'
    });

    console.log("Obtener un post por ID", post)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (error) {
    console.error('Error fetching post by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};





//CREAR UN POST
export const createPost = async (req, res) => {
  try {
    const { title, description, autor, imageURL } = req.body;
    if (!title || !description || !autor) {
      return res.status(400).json({ message: "Se requieren todos los campos (title, description, autor)" });
    }
    const newPost = new Post({ title, description, autor, imageURL });
    const postSaved = await newPost.save();
    res.status(201).json(postSaved);
  }
  catch (error) {
    console.error("Error al crear un nuevo post:", error);
    res.status(400).json({ message: "Error al crear un nuevo post", error: error.message });
  }

};

// ACTUALIZAR UN POST
export const updatePost = async (req, res) => {
  const { postId } = req.params; // Corregir aquí
  const post = req.body;

  try {
    const updatedPost = await Post.findByIdAndUpdate(postId, post, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    return res.status(404).json({ message: "No se pudo actualizar el post" });
  }
};



// Eliminar un post por ID
export const deletePostById = async (req, res) => {
  const { postId } = req.params;

  try {

    // Eliminar todos los comentarios asociados al post
    await Comment.deleteMany({ post: postId });

    // Eliminar el post por ID
    const deletedPost = await Post.findByIdAndDelete(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json({ message: 'Post and associated comments deleted successfully' });

  } catch (error) {
    console.error('Error deleting post by ID:', error);
    res.status(500).json({ message: 'Internal server error, al intentar eliminar un post por id' });
  }
};
