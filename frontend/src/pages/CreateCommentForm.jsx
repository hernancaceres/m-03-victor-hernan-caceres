import { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const CreateCommentForm = ({ onCommentCreated }) => {  // Agrega onCommentCreated como prop
  const { postId } = useParams();
  const [text, setText] = useState('');
  const { user } = useUser();

  // Asegúrate de que el usuario esté autenticado antes de renderizar el componente
  if (!user || !user.id) {
    // Puedes renderizar un mensaje o redirigir al usuario a la página de inicio de sesión
    return <p>Usuario no autenticado. Por favor, inicia sesión.</p>;
  }

  const handleCreateComment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:4000/api/comment/${postId}`,
        { description: text, autor: user.id },
        {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      console.log('Comentario creado:', response.data);

      // Llama a la función proporcionada desde las props para actualizar los comentarios en PostDetailPage
      onCommentCreated(response.data);

    } catch (error) {
      console.error('Error al crear el comentario:', error);
    }
  };

  return (
    <div>
      <h2>Crea Un Nuevo Comentario</h2>

      <textarea value={text} onChange={(e) => setText(e.target.value)}
        className='w-full bg-gray-500 text-white px-4 py-2 rounded-md my-2' />
      <br />
      <button onClick={handleCreateComment} className="bg-violet-900 px-4 py-2 rounded-md">
        Crear Comentario
      </button>
    </div>
  );
};

export default CreateCommentForm;

