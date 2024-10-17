const jwt = require('jsonwebtoken');
require("dotenv").config();

function authRolesMiddleware(allowedRoles) {
  return (req, res, next) => {
    // Obtener el token del header
    const token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado o no es un token Bearer" });
    }

    try {
      // Remover el prefijo "Bearer " y decodificar el token
      const actualToken = token.split(" ")[1];
      
      // Verificar el token usando jwt.verify y la clave secreta
      const decoded = jwt.verify(actualToken, process.env.SECRET_KEY);  // Reemplazar 'clave_secreta' con la clave real

      // Verificar si el usuario está activo y su rol está permitido
      if (decoded.state !== 1) {
        return res.status(403).json({ message: "Acceso no autorizado" });
      }

      // Verificar si el rol del usuario está en la lista de roles permitidos
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Acceso no autorizado" });
      }

      // Añadir los datos del usuario decodificado al objeto req para que esté disponible en el controlador
      req.user = decoded;

      next(); // Continuar al siguiente middleware o controlador
    } catch (error) {
      console.error("Error al verificar el token:", error);
      return res.status(401).json({ message: "Token inválido" });
    }
  };
}

module.exports = authRolesMiddleware;
