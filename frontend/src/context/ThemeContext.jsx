// import { createContext, useContext, useState } from "react"

// export const ThemeContext = createContext()

// export const useThemeContext = () => {
//     const context = useContext(ThemeContext)
//     return context
// }

// export const ThemeContextProvider = ({ children }) => {
//     const [contextTheme, setContextTheme] = useState('Dark')
//     //const [contextTheme, setContextTheme] = useState('Light')
//     console.log(contextTheme)
//     const values = { contextTheme, setContextTheme }
//     return (
//         <ThemeContext.Provider value={values}>
//             {children}
//         </ThemeContext.Provider>
//     )
// }

