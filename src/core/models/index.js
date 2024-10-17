const Empleados = require("./usuarios");
const Roles = require("./roles");
const Sucursales = require("./sucursales");
const Producto = require("./productos");
const CategoriaProducto = require("./categorias-producto");
const Mesas = require("./mesas");
const Clientes = require("./clientes");

function applyAssociations() {
  // Definir las relaciones aquí, después de que ambos modelos estén definidos
  Empleados.belongsTo(Roles, { as: "rol", foreignKey: "rol_id" });
  Roles.hasMany(Empleados, { as: "empleados", foreignKey: "rol_id" });

  Sucursales.hasMany(Empleados, { as: "empleados", foreignKey: "sucursal_id" });
  Empleados.belongsTo(Sucursales, {
    as: "sucursal",
    foreignKey: "sucursal_id",
  });

  Producto.belongsTo(CategoriaProducto, {
    as: "categoriaProducto",
    foreignKey: "categoria",
  });
  CategoriaProducto.hasMany(Producto, {
    as: "productos",
    foreignKey: "categoria",
  });

  Mesas.belongsTo(Sucursales, {
    as: "mesasSucursales",
    foreignKey: "sucursal_id",
  });
  Sucursales.hasMany(Mesas, {
    as: "sucursalesMesas",
    foreignKey: "sucursal_id",
  });

  Clientes.hasMany(Sucursales, {
    as: "clientesSucursales",
    foreignKey: "sucursal_alta",
  });
  Sucursales.hasMany(Mesas, {
    as: "sucursalesClientes",
    foreignKey: "sucursal_alta",
  });
}

module.exports = applyAssociations;
