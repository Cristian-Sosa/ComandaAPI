require("dotenv").config();
const jwt = require("jsonwebtoken");

const Empleados = require("../models/usuarios");
const Roles = require("../models/roles");
const Sucursales = require("../models/sucursales");

exports.loginUsuario = async (req, res) => {
  const user = req.body.usuario;
  const password = req.body.clave;

  let errorMessage;
  let token;
  let isUser;

  try {
    isUser = await Empleados.findOne({
      where: { usuario: user, clave: password },
      include: [
        {
          model: Roles,
          as: "rol", // El alias que definiste en la relación
          required: true, // Esto asegura que sea un inner join
        },
        {
          model: Sucursales,
          as: "sucursal", // El alias que definiste en la relación
          required: true, // Esto asegura que sea un inner join
        },
      ],
    });
  } catch (error) {
    errorMessage = error.message;
  }

  if (!isUser) {
    return res.status(401).json({ error: "Credenciales inválidas" });
  }

  const userSign = {
    id: isUser.id,
    name: isUser.usuario,
    role: isUser.rol_id,
    state: isUser.estado,
  };

  token = jwt.sign(userSign, `${process.env.SECRET_KEY}`, { expiresIn: "1d" });

  return res.json({
    usuario: {
      rol: isUser.rol.nombre,
      nombre: isUser.nombre,
      apellido: isUser.apellido,
      ruta: isUser.rol.ruta_acceso,
      sucursal: isUser.sucursal.nombre,
    },
    token: token,
  });
};
