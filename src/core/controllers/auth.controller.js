require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); 
const Empleados = require("../models/usuarios");
const Roles = require("../models/roles");
const Sucursales = require("../models/sucursales");

exports.loginUsuario = async (req, res) => {
  const { usuario, clave } = req.body; // Desestructurar para claridad

  try {
    const isUser = await Empleados.findOne({
      where: { usuario },
      include: [
        {
          model: Roles,
          as: "rol", // Asegúrate de que este alias coincida con el que definiste en la asociación
          required: true,
        },
        {
          model: Sucursales,
          as: "sucursal", // Cambiado a "sucursal"
          required: true,
        },
      ],
    });

    // Si el usuario no existe o la contraseña no es correcta
    if (!isUser || !(await bcrypt.compare(clave, isUser.clave))) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    // Construir el payload del token
    const userSign = {
      id: isUser.id,
      name: isUser.usuario,
      role: isUser.rol_id,
      state: isUser.estado,
    };

    // Generar el token
    const token = jwt.sign(userSign, process.env.SECRET_KEY, { expiresIn: "1d" });

    // Responder con la información del usuario y el token
    return res.json({
      usuario: {
        rol: isUser.rol.nombre,
        nombre: isUser.nombre,
        apellido: isUser.apellido,
        ruta: isUser.rol.ruta_acceso,
        sucursal: isUser.sucursal.nombre, // Cambiado a "sucursal"
      },
      token,
    });
  } catch (error) {
    console.error("Error en login:", error);
    return res.status(500).json({ error: "Ocurrió un error en el servidor" });
  }
};


exports.createEmpleado = async (req, res) => {
  const { nombre, apellido, documento, correo, telefono, usuario, clave, rol_id, sucursal_id, estado } = req.body;

  try {
    if (!nombre || !apellido || !documento || !usuario || !clave || !rol_id || !sucursal_id) {
      return res.status(400).json({ error: "Todos los campos obligatorios deben estar presentes." });
    }

    const existingUser = await Empleados.findOne({ where: { usuario } });
    if (existingUser) {
      return res.status(400).json({ error: "El nombre de usuario ya está en uso." });
    }

    const saltRounds = 10; // Puedes ajustar el número de rondas de sal
    const hashedPassword = await bcrypt.hash(clave, saltRounds);

    const newEmpleado = await Empleados.create({
      nombre,
      apellido,
      documento,
      correo,
      telefono,
      usuario,
      clave: hashedPassword, // Guardamos la contraseña encriptada
      rol_id,
      sucursal_id,
      estado: estado || 1, // Valor por defecto para estado si no se proporciona
    });

    return res.status(201).json({ message: "Empleado creado con éxito", empleado: newEmpleado });

  } catch (error) {
    console.error("Error al crear empleado:", error);
    return res.status(500).json({ error: "Error interno del servidor." });
  }
};
