import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const { user, dispatch } = useUser();
  const navigate = useNavigate();

  console.log('usuario navbar:', user);

  const logout = () => {
    // Realiza la acción de logout despachando la acción 'LOGOUT'
    dispatch({ type: 'LOGOUT' });

    // Aquí puedes realizar otras acciones necesarias, como redireccionar a la página de inicio, etc.
    // ...
    navigate('/login');
    console.log('Usuario desconectado');
  };

  return (
    <nav className="bg-gray-900 my-3 flex flex-col md:flex-row justify-between py-5 px-4 md:px-10 rounded-lg">
      <Link to="/">
        <h1 className="text-3xl font-bold">VIAJEROS</h1>
      </Link>
      <ul className="flex flex-col md:flex-row gap-x-2 items-center">
        <li>
          <button
            onClick={() => navigate('/posts')}
            className="bg-violet-900 hover:bg-violet-700 px-2 md:px-4 py-2 rounded-lg"
          >
            Ver Los Posts
          </button>
        </li>
        {/* Mostrar el botón "Crear un Post" solo si el usuario está autenticado */}
        {user && (
          <li>
            <button
              onClick={() => navigate('/create-post')}
              className="bg-violet-900 hover:bg-violet-700 px-2 md:px-4 py-2 rounded-lg"
            >
              Crear un Post
            </button>
          </li>
        )}
        {user ? (
          // Mostrar el botón de logout y el mensaje de bienvenida si el usuario está autenticado
          <>
            <li>
              <button
                onClick={() => navigate(`/profile/${user.id}`)}
                className="bg-violet-900 hover:bg-violet-700 px-2 md:px-4 py-2 rounded-lg">
                Mi Perfil
              </button>
            </li>

            <li>
              <span className="text-white mr-2 ">Bienvenido {user.username}</span>
            </li>
            <li>
              {/* Mostrar la imagen del usuario */}
              {user && user.avatarURL && (
                <img
                  src={user.avatarURL}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ marginRight: '2px' }}
                />
              )}
            </li>

            <li className="" >
              <button onClick={logout} className="bg-violet-900 hover:bg-violet-700 px-2 md:px-4 py-2 rounded-lg my-2">
                Logout
              </button>
            </li>
          </>
        ) : (
          // Mostrar los enlaces de login y registro si el usuario no está autenticado
          <>
            <li>
              <button onClick={() => navigate('/login')} className="bg-violet-900 hover:bg-violet-700 px-2 md:px-4 py-2 rounded-lg">
                Login
              </button>
            </li>
            <li>
              <button onClick={() => navigate('/register')} className="bg-violet-900 hover:bg-violet-700 px-2 md:px-4 py-2 rounded-lg">
                Register
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;





// import { Link } from "react-router-dom";
// import { useUser } from "../context/UserContext";
// import { useNavigate } from "react-router-dom";

// function Navbar() {
//   const { user, dispatch } = useUser();
//   const navigate = useNavigate();

//   console.log('usuario navbar:', user);

//   const logout = () => {
//     // Realiza la acción de logout despachando la acción 'LOGOUT'
//     dispatch({ type: 'LOGOUT' });

//     // Aquí puedes realizar otras acciones necesarias, como redireccionar a la página de inicio, etc.
//     // ...
//     navigate('/login');
//     console.log('Usuario desconectado');
//   };

//   return (
//     <nav className="bg-gray-900 my-3 flex justify-between py-5 px-10 rounded-lg ">
//       <Link to="/">
//         <h1 className="text-3xl font-bold">VIAJEROS</h1>
//       </Link>
//       <ul className="flex gap-x-2 items-center">
//         <li>
//           <Link to="/posts" className="bg-violet-900 px-4 py-2  rounded-sm">
//             Ver Los Posts
//           </Link>
//         </li>
//         {/* Mostrar el botón "Crear un Post" solo si el usuario está autenticado */}
//         {user && (
//           <li>
//             <Link to="/create-post" className="bg-violet-900 px-4 py-2 rounded-sm">
//               Crear un Post
//             </Link>
//           </li>
//         )}
//         {user ? (
//           // Mostrar el botón de logout y el mensaje de bienvenida si el usuario está autenticado
//           <>
//             <li>
//               <Link to={`/profile/${user.id}`} className="bg-violet-900 px-4 py-2 rounded-sm">
//                 Mi Perfil
//               </Link>
//             </li>

//             <li>
//               <span className="text-white mr-2">Bienvenido {user.username}</span>
//             </li>
//             <li>
//               {/* Mostrar la imagen del usuario */}
//               {user && user.avatarURL && (
//                 <img
//                   src={user.avatarURL}
//                   alt="Avatar"
//                   className="w-10 h-10 rounded-full object-cover"
//                   style={{  marginRight: '2px' }}
//                 />
//               )}
//             </li>

//             <li className="" >
//               <button onClick={logout} className="bg-violet-900 px-4 py-2 rounded-sm ">
//                 Logout
//               </button>
//             </li>
//           </>
//         ) : (
//           // Mostrar los enlaces de login y registro si el usuario no está autenticado
//           <>
//             <li>
//               <Link to="/login" className="bg-violet-900 px-4 py-2 rounded-sm">
//                 Login
//               </Link>
//             </li>
//             <li>
//               <Link to="/register" className="bg-violet-900 px-4 py-2 rounded-sm">
//                 Register
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// }

// export default Navbar;
