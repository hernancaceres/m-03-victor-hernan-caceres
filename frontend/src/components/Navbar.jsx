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
    <nav className="bg-purple-900 my-3 flex justify-between py-5 px-10 rounded-lg items-center">
      <Link to="/">
        <h1 className="text-2xl font-bold">Navbar</h1>
      </Link>
      <ul className="flex gap-x-2">
        <li>
          <Link to="/posts" className="bg-violet-900 px-4 py-2 rounded-sm">
            Ver Los Posts
          </Link>
        </li>
        {/* Mostrar el botón "Crear un Post" solo si el usuario está autenticado */}
        {user && (
          <li>
            <Link to="/create-post" className="bg-violet-900 px-4 py-2 rounded-sm">
              Crear un Post
            </Link>
          </li>
        )}
        {user ? (
          // Mostrar el botón de logout y el mensaje de bienvenida si el usuario está autenticado
          <>
            <li>
              <Link to={`/profile/${user.id}`} className="bg-violet-900 px-4 py-2 rounded-sm">
                Mi Perfil
              </Link>
            </li>

            <li>
              <span className="text-white mr-2">Bienvenido {user.username}</span>
            </li>
            <li>
              {/* Mostrar la imagen del usuario */}
              {user && user.avatarURL && (
                <img
                  src={user.avatarURL}
                  alt="Avatar"
                  className="w-10 h-10 rounded-full object-cover"
                  style={{ marginLeft: '2px', marginRight: '6px' }}
                />
              )}
            </li>

            <li className="inline-block align-middle" >
              <button onClick={logout} className="bg-violet-900 px-4 py-2 rounded-sm inline-block align-middle">
                Logout
              </button>
            </li>
          </>
        ) : (
          // Mostrar los enlaces de login y registro si el usuario no está autenticado
          <>
            <li>
              <Link to="/login" className="bg-violet-900 px-4 py-2 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="bg-violet-900 px-4 py-2 rounded-sm">
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
