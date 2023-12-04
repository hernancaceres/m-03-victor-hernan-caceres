import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useUser } from '../context/UserContext';

//import { useThemeContext } from "../context/ThemeContext"

const URI = 'http://localhost:4000/api/register'

const CompCreateUsuario = () => {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { user } = useUser();
    const { state } = useUser();  // Utiliza useUser para obtener el contexto de usuario
    console.log(user)
    // ...

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault();

        try {
            console.log('Intentando realizar la solicitud...');

            const response = await axios.post(URI, {
                username: nombre, email: email, password: password
            },
                {
                    withCredentials: true,
                });

            console.log('Respuesta del servidor:', response);

            // Accede correctamente al ID de usuario desde la respuesta del servidor
            const userId = response.data.id;
            console.log('ID de usuario obtenido:', userId);

            // Despacha la acción 'REGISTER_SUCCESS' con el ID del usuario

            state.dispatch({
                type: 'REGISTER_SUCCESS',
                payload: { userId },
            });

            // Redirige a la página de inicio
            navigate('/login');
        } catch (error) {
            // Imprime el error en la consola para su análisis
            console.error('Error en la solicitud:', error.response?.data || error.message);
        }
    };



    return (
        <div className='className=" bg-zinc-800 max-w-md px-10 rounded-md"'>
            <form onSubmit={store}>
                <input value={nombre} onChange={(e) => setNombre(e.target.value)} type="text"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder='Nombre' />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder='email' />
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
                    placeholder='Password' />

                <button type='button' onClick={store}  >Crear Usuario</button>
            </form>
        </div>
    )
}

export default CompCreateUsuario