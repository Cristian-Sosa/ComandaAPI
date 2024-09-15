require("dotenv").config();
const jwt = require("jsonwebtoken");

const Productos = require("../models/productos");
const Categorias = require("../models/categorias-producto");
const Empleados = require("../models/usuarios");

exports.GetAll = async (req, res) => {
  let errorMessage;
  let productList = [];

  const decoded = tokenDecoded(req.headers.authorization);

  try {
    isUser = await Empleados.findOne({ where: (id = decoded.id) });

    if (!isUser)
      return res.status(401).json({ error: "Usuario no habilitado" });

    productList = await Productos.GetAll({
      include: [
        {
          model: Categorias,
          as: "categoria",
          required: true,
        },
        {
          model: Categorias,
          as: "subcategoria",
          required: false,
        },
      ],
    });
  } catch (error) {
    errorMessage = error.message;
  }

  return res.status(200).json({ products: productList });
};
