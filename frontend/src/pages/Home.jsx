
import { useUser } from '../context/UserContext';

const Home = () => {
  const { user } = useUser();

  console.log('Estado del contexto en la página Home:', user);

  return (
    <div>
      <h2>Home</h2>
      {/* Resto del contenido de la página */}
    </div>
  );
};

export default Home;
