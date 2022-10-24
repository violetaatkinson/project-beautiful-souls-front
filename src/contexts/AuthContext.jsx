import { createContext, useState, useContext, useEffect } from 'react'
import { setToken, getAccessToken, logout } from '../token/AccessToken'
import { getCurrentUser } from '../services/UserService'
import { verifyJWT } from '../helpers/jwtHelper'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()
  const [isAuthenticationFetched, setIsAuthenticationFetched] = useState(false)


  const login = (token) => {
    setToken(token)

    getUser()
  }

  const getUser = (cb) => {
    getCurrentUser()
      .then(user => {
        setUser(user)
        setIsAuthenticationFetched(true)
        // cb && cb() Callback por si queremos hacer algo justo al traernos el usuario
      })
  }

  useEffect(() => {
    // Si existe token, me traigo al usuario

    if (getAccessToken()) {
      if (!verifyJWT(getAccessToken())) {
        logout()
      } else {
        getUser()
      }
    } else {
      setIsAuthenticationFetched(true)
    }
  }, [])

  const value = {
    user,
    login,
    getUser,
    isAuthenticationFetched
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext

// verifyJWT => recibir un token => decodedToken = > sacamos la info del token
// accesToken = >  cojo el token del localStorage y envio el valor de access_token
// getAccessToken => nos devuelve el token del localStorage con la clave access_token
 
