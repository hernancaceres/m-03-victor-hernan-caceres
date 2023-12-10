import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const URI = 'http://localhost:4000/api/register';

const CompCreateUsuario = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const userContext = useUser();
  const [duplicateEmailError, setDuplicateEmailError] = useState(false);

  // Función asíncrona para manejar el registro
  const store = async (e) => {
    e.preventDefault();

    try {
      console.log('Intentando realizar la solicitud...');
      console.log('Nombre de usuario:', nombre); 

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
      if (error.response?.status === 409) {
        // Si el código de estado es 409, significa que el correo electrónico está duplicado
        setDuplicateEmailError(true);
      } else {
        // Si es otro tipo de error, actualiza el estado de errores con los errores del servidor
        const serverErrors = error.response?.data?.errors || [];
        setErrors(serverErrors);
      }

       // Imprime el error en la consola para su análisis
       console.error('Error en la solicitud:', error.response?.data);
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
          error.path === 'username' &&
          <div className='bg-zinc-900 text-red-500' key={index}>
            {error.msg}</div>
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
          error.path === 'email' &&
          <div className='bg-zinc-900 text-red-500' key={index}>
            {error.msg}</div>
        ))}

         {/* Muestra el error de correo electrónico duplicado */}
         {duplicateEmailError && (
          <div className='bg-zinc-900 text-red-500'>
            El correo electrónico ya está registrado. Por favor, utiliza otro correo electrónico.
          </div>
        )}

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type='text'
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2'
          placeholder='Password'
        />
        {/* Muestra los errores del campo 'password' */}
        {errors.map((error, index) => (
          error.path === 'password' && 
          <div className=' bg-zinc-900 text-red-500' key={index}>
            {error.msg}</div>
        ))}

        <button type='submit'>Crear Usuario</button>
      </form>

      <p className="flex gap-x-2 justify-between">
          ¿Ya tienes una cuenta? <Link to="/login"
          className="text-withe-500">Login</Link>
        </p>
    </div>
  );
};

export default CompCreateUsuario;
