
import { useUser } from '../context/UserContext';
import PostList from './PostList'; // Asegúrate de que la ruta del import sea correcta

const Home = () => {
  const { user } = useUser();

  console.log('Estado del contexto en la página Home:', user);

  return (
    <div>
    
      {/* Renderiza el componente PostList para mostrar todos los posts */}
      <PostList />
      {/* Resto del contenido de la página */}
    </div>
  );
};

export default Home;
