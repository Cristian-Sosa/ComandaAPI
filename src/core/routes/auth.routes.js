const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const limiter1 = require("../../shared/middlewares/rateLimmitMiddleware");

/**
 * @swagger
 * /sistema-comanda/api/v1/auth/login:
 *   post:
 *     summary: Inicia sesión de usuario
 *     description: Inicia sesión de usuario utilizando nombre de usuario y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             usuario: "admin"
 *             clave: "12345678"
 *     responses:
 *       200:
 *         description: Sesión de usuario iniciada correctamente.
 *         content:
 *           application/json:
 *             example:
 *               {
 *                  usuario: {
 *                              rol: nombre_rol,
 *                              nombre: nombre_de_usuairo,
 *                              apellido: apellido_de_usuairo,
 *                              ruta: ruta_de_acceso,
 *                              sucursal: nombre_de_sucursal,
 *                          },
 *                  token: token_de_ejemplo,
 *              }
 *       401:
 *         description: Credenciales ingresadas inválidas.
 *         content:
 *           application/json:
 *             example:
 *               error: mensaje_de_error
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/login", limiter1, authController.loginUsuario);

router.post("/createUsuario", limiter1, authController.createEmpleado);

module.exports = router;
