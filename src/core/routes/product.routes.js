const express = require("express");
const router = express.Router();
const productoController = require("../controllers/product.controller");
const limiter1 = require("../../shared/middlewares/rateLimmitMiddleware");

/**
 * @swagger
 * /product/getAll:
 *   get:
 *     summary: Obtiene todos los productos
 *     description: Obtiene un listado de todos los productos.
 *     responses:
 *       200:
 *         description: Productos obtenidos correctamente.
 *         content:
 *           application/json:
 *             example:
*                  [
*                      {
*                          id: int,
*                          codigo_interno: codigo_interno,
*                          codigo_proveedor: codigo_proveedor,
*                          codigo_ean: codigo_ean,
*                          nombre: nombre_producto,
*                          descripcion: descripcion_producto,
*                          aclaracion: aclaracion_producto,
*                          categoria: objeto aclaracion_producto,
*                          subcategoria: objeto categoria_producto,
*                          proveedor: objecto proveedor_producto,
*                          estado: estado_producto,
*                      }
*                  ]
 *       400:
 *         description: Error obteniendo los productos.
 *         content:
 *           application/json:
 *             example:
 *               error: mensaje_de_error
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/GetAll", limiter1, productoController.GetAll);

// router.get("/GetProducto/{id}", limiter1, productoController.GetSingleProducto);

// router.update("/UpdateProduct/{id}", limiter1, productoController.UpdateProduct);

// router.patch("/DisableProduct/{id}", limiter1, productoController.DisableProduct);

// router.patch("/DisableProduct/{id}", limiter1, productoController.DesableProduct);

module.exports = router;
