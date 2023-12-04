import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      console.log('Reducer: Setting user:', action.payload);
      // Lógica para establecer el usuario
      return {
        ...state,
        user: action.payload,
      };
    case 'REGISTER_SUCCESS':
      console.log('Reducer: Registration success:', action.payload);
      // Actualiza el estado con el ID del usuario después del registro
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.userId, // Asegúrate de que la respuesta del servidor incluya el ID del usuario
        },
      };

      case 'LOGIN_SUCCESS':
      console.log('Reducer: Login success:', action.payload);
      // Actualiza el estado con el ID del usuario después del inicio de sesión
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.userId, // Asegúrate de que la respuesta del servidor incluya el ID del usuario
        },
      };
      
    // Otros casos para manejar acciones como 'LOGOUT', 'UPDATE_USER', etc.
    default:
      return state;
  }
};


export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, { user: null });

  console.log('User context state:', state);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe usarse dentro de un UserProvider');
  }
  return context;
};
