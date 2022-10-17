import { createContext, useState, useContext, useEffect } from 'react'
import { setToken, getAccessToken, logout } from '../token/AccessToken'
import { getCurrentUser } from '../services/UserService'
import { verifyJWT } from '../helpers/jwtHelper'

const AuthContext = createContext()

export const useAuthContext = () => useContext(AuthContext)

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState()

  const login = (token) => {
    setToken(token)

    getUser()
  }

  const getUser = (cb) => {
    getCurrentUser()
      .then(user => {
        setUser(user)

        // cb && cb() Callback por si queremos hacer algo justo al traernos el usuario
        console.log('el user loco: ', user);
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
    }
  }, [])

  const value = {
    user,
    login,
    getUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext