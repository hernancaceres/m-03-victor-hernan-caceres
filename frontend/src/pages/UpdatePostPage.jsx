import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, } from 'react-router-dom';
import { useUser, UserProvider } from '../context/UserContext';

const UpdatePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/post/${postId}`);
        setPost(response.data);
      } catch (error) {
        console.error('Error al obtener el post:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:4000/api/post/${postId}`,
        {
          title: updatedTitle || post.title,
          description: updatedDescription || post.description,
        },
        {
          headers: {
            'x-access-token': token,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      // Puedes redirigir a la página de detalle del post o hacer cualquier otra acción después de la actualización.
     
      navigate(`/post/${postId}`);
    } catch (error) {
      console.error('Error al actualizar el post:', error);
    }
  };

  return (
    <div>
      <h1>Actualizar Post</h1>
      <label>Titulo:</label>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
      />
      <label>Descripción:</label>
      <input
        type="text"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
      />
      <button onClick={handleUpdate}>Actualizar</button>
    </div>
  );
};

const WrappedUpdatePostPage = () => (
  <UserProvider>
    <UpdatePostPage />
  </UserProvider>
);

export default WrappedUpdatePostPage;
