// ! [feature pendiente] all: Abstraer la validación del token de usuario

const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const sequelize = require("./config/sequelize-config");

// * Configuración del modelo en db
const SucursalesModel = require("./src/core/models/sucursales");
const CategoriaProductoModel = require("./src/core/models/categorias-producto");
const ProductosModel = require("./src/core/models/productos");
const ClienteModel = require("./src/core/models/clientes");
const DetallePedidoModel = require("./src/core/models/detalle-pedido");
const MesasModel = require("./src/core/models/mesas");
const PedidosModel = require("./src/core/models/pedidos");
const PreciosModel = require("./src/core/models/precios");
const RegistroAccionesModel = require("./src/core/models/registro-usuarios");
const RolesModel = require("./src/core/models/roles");
const UsuariosModel = require("./src/core/models/usuarios");
const applyAssociations = require("./src/core/models/index");

const cors = require("cors");

const app = express();
app.set("trust proxy", 1);

app.use(bodyParser.json());
app.use(cors());

// * Configuración de rutas
const rutaPadre = "/sistema-comanda/api/v1";

// ! Configuración de rutas v1
const authRoutes = require("./src/core/routes/auth.routes");
app.use(rutaPadre.concat("/auth"), authRoutes);

const productRoutes = require("./src/core/routes/product.routes");
app.use(rutaPadre.concat("/product"), productRoutes);

// Configuración de Swagger UI
app.use(
  rutaPadre.concat("/api-docs"),
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

// Configuración del servidor
const port = process.env.PORT || 3000;

applyAssociations();

sequelize
  .authenticate()
  .then(() => {
    console.info("Conexión a la base de datos establecida con éxito.");

    app.listen(port, "0.0.0.0", () =>
      console.info(`El servidor está escuchando en el puerto ${port}`)
    );
  })
  .catch((error) =>
    console.error("Error al conectar a la base de datos:", error)
  );

//  * Descomentar si no hay tablas y/o datos
sequelize
  .sync({ force: true })
  .then(async () => {
    // * Semillado SQL
    const sqlCommands = [
      'INSERT IGNORE INTO roles (nombre, ruta_acceso) VALUES ("admin", "gestor-comanda");',
      'INSERT IGNORE INTO roles (nombre, ruta_acceso) VALUES ("mozo", "comandera");',
      'INSERT IGNORE INTO roles (nombre, ruta_acceso) VALUES ("cocina", "visor-pedidos");',
      'INSERT IGNORE INTO sucursales (nombre, direccion, estado) VALUES ("Sucursal Centro", "Av. Central 123", 1), ("Sucursal Norte", "Calle Norte 456", 1), ("Sucursal Sur", "Calle Sur 789", 1);',
      'INSERT IGNORE INTO empleados (nombre, apellido, documento, correo, telefono, usuario, clave, rol_id, sucursal_id, estado) VALUES ("Cristian", "Sosa", "44653284", "example@gmail.com", "3517626141", "sosa", "$2a$10$OBO2oDNB95.ogJhAwWM83ORwGdsKxQt58HuRfNTsulCD6qTlloVFm", 1, 1, 1);',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("tablas y entradas", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("papas", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("sandwiches", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("lomos", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("hamburguesas", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("tostados", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("choripan", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("ensalada", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("pizzas", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("bebidas", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("sin alcohol", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("cervezas", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("con alcohol", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("espumantes", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("vinos", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("tragos", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("tragos de autor", 1)',
      'INSERT IGNORE INTO categoria_producto (nombre, estado) VALUES ("desayunos", 1)',
    ];

    for (const command of sqlCommands) {
      try {
        await sequelize.query(command);
      } catch (error) {
        console.error(`Error al ejecutar el semillado por comando SQL`);
      }
    }
  })
  .catch((err) => {
    console.error("Error al sincronizar las tablas:", err);
  });
