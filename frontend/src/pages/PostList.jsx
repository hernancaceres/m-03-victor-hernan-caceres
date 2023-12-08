import { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from './PostItem';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/post');
        setPosts(response.data);
      } catch (error) {
        console.error('Error al obtener los posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`http://localhost:4000/api/post/${postId}`, {
        headers: {
          'x-access-token': token,
        },
        withCredentials: true,
      });
 
      // Filtrar los posts después de la eliminación
      const updatedPosts = posts.filter((post) => post._id !== postId);

      // Establecer el estado con la nueva lista filtrada
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error al eliminar el post:', error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-2 post-list">
      {posts.map((post) => (
        <PostItem key={post._id} post={post} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default PostList;
