import { useState } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext'; // Asegúrate de que la ruta sea correcta

const CreatePostForm = () => {
  const { user } = useUser(); // Obtén el usuario del contexto
  console.log('CreatePostForm: User from context:', user);

  const [post, setPost] = useState({
    title: '',
    description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleCreatePost = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:4000/api/post',
        { ...post, autor: user.id }, // Asegúrate de incluir el autor en la solicitud
        {
          headers: {
            'x-access-token': localStorage.getItem('token'),
          },
          withCredentials: true,
        }
      );

      // Lógica adicional después de crear el post (redirección, actualización, etc.)
      console.log('Post creado:', response.data);
    } catch (error) {
      console.error('Error al crear el post:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <h2>Crear Nuevo Post</h2>
      <form onSubmit={handleCreatePost}>
        <input type="text" name="title"  placeholder="title" value={post.title} onChange={handleInputChange}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
        <br />
        <label>Descripción: </label>
        <textarea name="description" placeholder="description" value={post.description} onChange={handleInputChange} 
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
        <br />
        <button type="submit">Crear Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;
