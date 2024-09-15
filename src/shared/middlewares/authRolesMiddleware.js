const jwt = require('jsonwebtoken');
const tokenDecoded = require("../services/tokenDecoded");

function authRolesMiddleware(allowedRoles) {
  return (req, res, next) => {
    
    // Existencia de token
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    try {
      // Token del tipo Bearer
      if (!token || !token.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Token no proporcionado o no es un token Bearer" });
      }

      const decoded = tokenDecoded(token);

      // Estado activo y rol proporcionado.
      if (decoded.state != 1 || decoded.length == 0) {
        return res.status(403).json({ message: "Acceso no autorizado" });
      }
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Acceso no autorizado" });
      }

      next();
    } catch (error) {
      console.error("Error al verificar el token:", error);

      return res.status(401).json({ message: "Token inválido" });
    }
  };
}

module.exports = authRolesMiddleware;