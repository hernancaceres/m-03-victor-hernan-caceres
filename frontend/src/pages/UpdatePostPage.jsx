import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, } from 'react-router-dom';
import { useUser, UserProvider } from '../context/UserContext';

const UpdatePostPage = () => {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('');
  const [updatedImageURL, setUpdatedImageURL] = useState(''); // Nuevo estado para la imagen
  const navigate = useNavigate();
  const { user } = useUser();
  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/post/${postId}`);
        setPost(response.data);
        setUpdatedTitle(response.data.title);
        setUpdatedDescription(response.data.description);
        setUpdatedImageURL(response.data.imageURL);
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
          imageURL: updatedImageURL || post.imageURL, // Actualiza la imagen también
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
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <h1>Actualizar Post</h1>
      <label>Titulo:</label>
      <input
        type="text"
        value={updatedTitle}
        onChange={(e) => setUpdatedTitle(e.target.value)}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
      <label>Descripción:</label>
      <textarea
        type="text"
        value={updatedDescription}
        onChange={(e) => setUpdatedDescription(e.target.value)}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
        <label>Imagen:</label>
      <textarea
        type="text"
        value={updatedImageURL}
        onChange={(e) => setUpdatedImageURL(e.target.value)}
        className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>

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









// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams, } from 'react-router-dom';
// import { useUser, UserProvider } from '../context/UserContext';

// const UpdatePostPage = () => {
//   const { postId } = useParams();
//   const [post, setPost] = useState({});
//   const [updatedTitle, setUpdatedTitle] = useState('');
//   const [updatedDescription, setUpdatedDescription] = useState('');
//   const navigate = useNavigate();
//   const { user } = useUser();
  

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.get(`http://localhost:4000/api/post/${postId}`);
//         setPost(response.data);
//       } catch (error) {
//         console.error('Error al obtener el post:', error);
//       }
//     };

//     fetchPost();
//   }, [postId]);

//   const handleUpdate = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         `http://localhost:4000/api/post/${postId}`,
//         {
//           title: updatedTitle || post.title,
//           description: updatedDescription || post.description,
//         },
//         {
//           headers: {
//             'x-access-token': token,
//             'Content-Type': 'application/json',
//           },
//           withCredentials: true,
//         }
//       );

//       // Puedes redirigir a la página de detalle del post o hacer cualquier otra acción después de la actualización.
     
//       navigate(`/post/${postId}`);
//     } catch (error) {
//       console.error('Error al actualizar el post:', error);
//     }
//   };

//   return (
//     <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
//       <h1>Actualizar Post</h1>
//       <label>Titulo:</label>
//       <input
//         type="text"
//         value={updatedTitle}
//         onChange={(e) => setUpdatedTitle(e.target.value)}
//         className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
//       <label>Descripción:</label>
//       <input
//         type="text"
//         value={updatedDescription}
//         onChange={(e) => setUpdatedDescription(e.target.value)}
//         className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'/>
        
//       <button onClick={handleUpdate}>Actualizar</button>
//     </div>
//   );
// };

// const WrappedUpdatePostPage = () => (
//   <UserProvider>
//     <UpdatePostPage />
//   </UserProvider>
// );

// export default WrappedUpdatePostPage;

