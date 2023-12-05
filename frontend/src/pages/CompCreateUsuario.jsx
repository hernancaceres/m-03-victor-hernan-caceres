import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const URI = 'http://localhost:4000/api/register';

const CompCreateUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const userContext = useUser();

  // Función asíncrona para manejar el registro
  const store = async (e) => {
    e.preventDefault();

    try {
      console.log('Intentando realizar la solicitud...');

      const response = await axios.post(
        URI,
        {
          username: nombre,
          email: email,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      console.log('Respuesta del servidor:', response);

      // Accede correctamente al ID de usuario desde la respuesta del servidor
      const userId = response.data.id;
      console.log('ID de usuario obtenido:', userId);

      console.log('Estado del contexto antes de despachar:', userContext.state);

      if (userContext.state && userContext.state.user) {
        console.log('Despachando la acción REGISTER_SUCCESS...');
        userContext.dispatch({
          type: 'REGISTER_SUCCESS',
          payload: { userId },
        });
      } else {
        console.error('El contexto de usuario es null. No se puede despachar la acción.');
      }

      console.log('Estado del contexto después de despachar:', userContext.state);

      // Redirige a la página de inicio
      navigate('/login');
    } catch (error) {
       // Actualiza el estado de errores con los errores del servidor
       const serverErrors = error.response?.data?.errors || [];
       setErrors(serverErrors);
 
       // Imprime el error en la consola para su análisis
       console.error('Error en la solicitud:', serverErrors);
    }
  };


  return (
    <div className='bg-zinc-800 max-w-md px-10 rounded-md'>
      <form onSubmit={(e) => { e.preventDefault(); store(e); }}>

        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          type='text'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder='Nombre'
        />
         {/* Muestra los errores del campo 'username' */}
         {errors.map((error, index) => (
          error.path === 'username' && <p key={index}>{error.msg}</p>
        ))}

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type='text'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder='email'
        />
       {/* Muestra los errores del campo 'email' */}
       {errors.map((error, index) => (
          error.path === 'email' && <p key={index}>{error.msg}</p>
        ))}

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='text'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder='Password'
        />
         {/* Muestra los errores del campo 'password' */}
         {errors.map((error, index) => (
          error.path === 'password' && <p key={index}>{error.msg}</p>
        ))}

        <button type='submit'>Crear Usuario</button>
      </form>
    </div>
  );
};

export default CompCreateUsuario;
