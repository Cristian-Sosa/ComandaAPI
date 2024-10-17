const express = require("express");
const router = express.Router();
const productoController = require("../controllers/product.controller");
const limiter1 = require("../../shared/middlewares/rateLimmitMiddleware");
const JWTMiddleware = require("../../shared/middlewares/authRolesMiddleware");

// * Get all products
/**
 * @swagger
 * /sistema-comanda/api/v1/product/getAll:
 *   get:
 *     summary: Obtiene todos los productos
 *     description: Obtiene un listado de todos los productos.
 *     responses:
 *       200:
 *         description: Productos obtenidos correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     products:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             description: ID del producto
 *                           codigo_interno:
 *                             type: string
 *                             description: Código interno del producto
 *                           codigo_proveedor:
 *                             type: string
 *                             description: Código del proveedor
 *                           codigo_ean:
 *                             type: string
 *                             description: Código EAN del producto
 *                           nombre:
 *                             type: string
 *                             description: Nombre del producto
 *                           descripcion:
 *                             type: string
 *                             description: Descripción del producto
 *                           aclaracion:
 *                             type: string
 *                             description: Aclaraciones sobre el producto
 *                           categoria:
 *                             type: object
 *                             description: Objeto de la categoría
 *                           subcategoria:
 *                             type: object
 *                             description: Objeto de la subcategoría
 *                           proveedor:
 *                             type: object
 *                             description: Objeto del proveedor
 *                           estado:
 *                             type: integer
 *                             description: Estado del producto
 *             example:
 *               {
 *                 data: {
 *                   products: [
 *                     {
 *                       id: 1,
 *                       codigo_interno: 'INT001',
 *                       codigo_proveedor: 'PROV001',
 *                       codigo_ean: 'EAN001',
 *                       nombre: 'Producto A',
 *                       descripcion: 'Descripción del Producto A',
 *                       aclaracion: 'Aclaración A',
 *                       categoria: {},
 *                       subcategoria: {},
 *                       proveedor: {},
 *                       estado: 1
 *                     }
 *                   ]
 *                 },
 *                 message: 'Productos obtenidos correctamente'
 *               }
 *       400:
 *         description: Error obteniendo los productos.
 *         content:
 *           application/json:
 *             example:
 *               { error: 'mensaje_de_error' }
 *       401:
 *         description: Usuario no habilitado.
 *         content:
 *           application/json:
 *             example:
 *               { error: 'Usuario no habilitado' }
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             example:
 *               { error: 'Error interno del servidor' }
 */
router.get(
  "/GetAll",
  JWTMiddleware([1, 2, 3]),
  limiter1,
  productoController.GetAll
);

// * Get a single product
router.get(
  "/GetProducto/:id",
  JWTMiddleware([1, 2, 3]),
  limiter1,
  productoController.GetSingleProducto
);

// * Create a product
/**
 * @swagger
 * /sistema-comanda/api/v1/product/createProduct:
 *   post:
 *     summary: Crea producto
 *     description: Crea un producto nuevo.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               codigo_interno:
 *                 type: string
 *               codigo_proveedor:
 *                 type: string
 *               codigo_ean:
 *                 type: string
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               aclaracion:
 *                 type: string
 *               categoria:
 *                 type: integer
 *               proveedor_id:
 *                 type: integer
 *               sub_categoria:
 *                 type: integer
 *               estado:
 *                 type: integer
 *           example:
 *             codigo_interno: 'INT001'
 *             codigo_proveedor: 'PROV001'
 *             codigo_ean: 'EAN001'
 *             nombre: 'Producto A'
 *             descripcion: 'Descripción del Producto A'
 *             aclaracion: 'Aclaración A'
 *             categoria: 1
 *             proveedor_id: 1
 *             sub_categoria: 1
 *             estado: 1
 *     responses:
 *       200:
 *         description: Producto creado.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                 id: 0,
 *                 codigo_interno: 'INT001',
 *                 codigo_proveedor: 'PROV001',
 *                 codigo_ean: 'EAN001',
 *                 nombre: 'Producto A',
 *                 descripcion: 'Descripción del Producto A',
 *                 aclaracion: 'Aclaración A',
 *                 categoria: 1,
 *                 sub_categoria: 1,
 *                 proveedor_id: 1,
 *                 estado: 1,
 *               }
 *       400:
 *         description: El producto no se creó correctamente.
 *         content:
 *           application/json:
 *             example:
 *               { data: { product: null }, message: "El producto no se creó correctamente" }
 *       401:
 *         description: Usuario no habilitado.
 *         content:
 *           application/json:
 *             example:
 *               { error: "Usuario no habilitado" }
 *       500:
 *         description: Error interno del servidor.
 */
router.post(
  "/CreateProduct",
  JWTMiddleware([1]),
  limiter1,
  productoController.CreateProduct
);

// * Disable a product
router.patch(
  "/DisableProduct/:id",
  JWTMiddleware([1]),
  limiter1,
  productoController.DisableProduct
);

// * Enable a product
router.patch(
  "/EnableProduct/:id",
  JWTMiddleware([1]),
  limiter1,
  productoController.EnableProduct
);

// * Modify a product
router.put(
  "/UpdateProduct/:id",
  JWTMiddleware([1]),
  limiter1,
  productoController.UpdateProduct
);

module.exports = router;
