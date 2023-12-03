import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
//import { useThemeContext } from "../context/ThemeContext"

const URI = 'http://localhost:4000/api/register'

const CompCreateUsuario = () => {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    //const { contextTheme } = useThemeContext()
    // recordar agregar el id: id={contextTheme} en el boton del formulario para utilizar este contexto

    //procedimiento guardar
    const store = async (e) => {
        e.preventDefault();

        try {
            await axios.post(URI, {
                username: nombre, email: email, password: password
            },
                {
                    withCredentials: true,  // Agrega esta línea para permitir el uso de credenciales
                    // headers: { 'x-access-token': localStorage.getItem('token') },
                }
            );

            // Redirige a la página de crear post
            navigate('/');

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
                    placeholder='Nombre'/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="text"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                    placeholder='email'/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} type="text"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2" 
                    placeholder='Password'/>

                <button type='submit'  >Crear Usuario</button>
            </form>
        </div>
    )
}

export default CompCreateUsuario