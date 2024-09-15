const express = require("express");
const bodyParser = require("body-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swaggerConfig");
const sequelize = require("./config/sequelize-config");

// Configuración del modelo en db
const ClienteModel = require("./src/core/models/clientes");
const CategoriaProductoModel = require("./src/core/models/categorias-producto");
const DetallePedidoModel = require("./src/core/models/detalle-pedido");
const MesasModel = require("./src/core/models/mesas");
const PedidosModel = require("./src/core/models/pedidos");
const PreciosModel = require("./src/core/models/precios");
const ProductosModel = require("./src/core/models/productos");
const RegistroAccionesModel = require("./src/core/models/registro-usuarios");
const RolesModel = require("./src/core/models/roles");
const SucursalesModel = require("./src/core/models/sucursales");
const UsuariosModel = require("./src/core/models/usuarios");
const ModelConfig = require("./src/core/models/index")

const cors = require("cors");

const app = express();
app.set("trust proxy", 1);

app.use(bodyParser.json());
app.use(cors());

// Configuración de rutas
const authRoutes = require("./src/core/routes/auth.routes");
app.use("/auth", authRoutes);

const productRoutes = require("./src/core/routes/product.routes");
app.use("/product", productRoutes);

// Configuración de Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Configuración del servidor
const port = process.env.PORT || 3000;

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

sequelize
  .sync({ force: true })
  .then(async () => {
    // console.log("Tablas sincronizadas correctamente.");

    // Semillado SQL
    const sqlCommands = [
      'INSERT IGNORE INTO roles (nombre, ruta_acceso) VALUES ("admin", "gestor-comanda");',
      'INSERT IGNORE INTO roles (nombre, ruta_acceso) VALUES ("mozo", "comandera");',
      'INSERT IGNORE INTO roles (nombre, ruta_acceso) VALUES ("cocina", "visor-pedidos");',
      'INSERT IGNORE INTO sucursales (nombre, direccion) VALUES ("Alto Verde", "Calle falsa 4350");',
      'INSERT IGNORE INTO empleados (nombre, apellido, documento, correo, telefono, usuario, clave, rol_id, sucursal_id, estado) VALUES ("Cristian", "Sosa", "44653284", "gustavosocris@gmail.com", "3517626141", "admin", "12345678", 1, 1, 1);',
      'INSERT IGNORE INTO empleados (nombre, apellido, documento, correo, telefono, usuario, clave, rol_id, sucursal_id, estado) VALUES ("Cristian", "Sosa", "44653285", "gustavosocris2@gmail.com", "3517626142", "csosa", "1234", 2, 1, 1);',
      'INSERT IGNORE INTO empleados (nombre, apellido, documento, correo, telefono, usuario, clave, rol_id, sucursal_id, estado) VALUES ("Cristian", "Sosa", "44653286", "gustavosocris3@gmail.com", "3517626143", "csosa", "123456", 3, 1, 1);',
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
        // console.info({'Semillado exitoso': command});
      } catch (error) {
        console.error(`Error al ejecutar el semillado por comando SQL`);
      }
    }
  })
  .catch((err) => {
    console.error("Error al sincronizar las tablas:", err);
  });
