import decode from "jwt-decode";

export const verifyJWT = (token) => {
  // recibir un token
  const decodedToken = decode(token); // con esta función, sacamos la info de nuestro jwt

  return Date.now() <= decodedToken.exp * 1000; // hoy tiene que ser menor que mañana ;);) devolviendo true si no ha expirado y false si ha expirado
};