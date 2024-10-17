require("dotenv").config();

const Productos = require("../models/productos");
const Categorias = require("../models/categorias-producto");

// * Devuelve un listado de productos
exports.GetAll = async (req, res) => {
  try {
    productList = await Productos.findAll({
      include: [
        {
          model: Categorias,
          as: "categoriaProducto",
          required: true,
        },
        {
          model: Categorias,
          as: "subcategoriaProducto",
          required: false,
        },
      ],
    })
      .then((response) => {
        return res.status(200).json({
          data: { products: response },
          message: "Productos obtenidos correctamente",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          data: { product: null },
          message: "No se pudo obtener el listado de productos",
        });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// * Crea un producto nuevo producto
exports.CreateProduct = async (req, res) => {
  try {
    let productToCreate = await Productos.create(req.body);

    await productToCreate
      .save()
      .then((response) => {
        return res.status(200).json({
          data: { product: response.dataValues },
          message: "Producto creado",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          data: { product: null },
          message: "El producto no se creó correctamente",
        });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// * Devuelve un producto
exports.GetSingleProducto = async (req, res) => {
  let producto;

  try {
    producto = await Productos.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Categorias,
          as: "categoriaProducto",
          required: true,
        },
        {
          model: Categorias,
          as: "subcategoriaProducto",
          required: false,
        },
      ],
    })
      .then((response) => {
        if (response == null)
          return res.status(400).json({
            data: { product: response },
            message: "No se encontró el producto",
          });

        return res.status(200).json({
          data: { product: response },
          message: "Producto obtenido correctamente",
        });
      })
      .catch((err) => {
        return res.status(400).json({
          data: { product: null },
          message: "No se pudo obtener el listado de productos",
        });
      });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// * Deshabilita un producto
exports.DisableProduct = async (req, res) => {
  try {
    let productToDisable = await Productos.findOne({
      where: { id: req.params.id },
    });

    if (!productToDisable) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    productToDisable.estado = 0;
    let result = await productToDisable.save();

    return res.status(200).json({
      data: { product: result.dataValues },
      message: "Producto deshabilitado",
    });
  } catch (error) {
    console.error("Error al deshabilitar el producto:", error);
    return res.status(500).json({ error: "Error al deshabilitar el producto" });
  }
};

// * Habilita un producto
exports.EnableProduct = async (req, res) => {
  try {
    let productToEnable = await Productos.findOne({
      where: { id: req.params.id },
    });

    if (!productToEnable) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    productToEnable.estado = 1;
    let result = await productToEnable.save();

    return res.status(200).json({
      data: { product: result.dataValues },
      message: "Producto habilitado",
    });
  } catch (error) {
    console.error("Error al habilitar el producto:", error);
    return res.status(500).json({ error: "Error al habilitar el producto" });
  }
};

// * Actualiza un producto
exports.UpdateProduct = async (req, res) => {
  try {
    let productToUpdate = await Productos.findOne({
      where: { id: req.body.id },
    });

    console.info({ producto: productToUpdate });

    if (!productToUpdate) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    let result = await productToUpdate.update(req.body);

    return res.status(200).json({
      data: { product: result.dataValues },
      message: "Producto actualizado",
    });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ error: "Error al actualizar el producto" });
  }
};
