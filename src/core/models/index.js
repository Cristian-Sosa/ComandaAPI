const Empleados = require("./usuarios");
const Roles = require("./roles");
const Sucursales = require("./sucursales");

// Un empleado tiene un rol (foreignKey: rol_id en la tabla EMPLEADOS)
Empleados.belongsTo(Roles, {
  foreignKey: "rol_id", // Foreign key en EMPLEADOS que referencia a ROLES
  as: "rol", // Alias para acceder al rol del empleado
});

// Un rol puede tener muchos empleados
Roles.hasMany(Empleados, {
  foreignKey: "rol_id",
  as: "empleados",
});


// Un empleado tiene una sucursal (foreignKey: sucursal_id en la tabla EMPLEADOS)
Empleados.belongsTo(Sucursales, {
  foreignKey: "sucursal_id", // Foreign key en EMPLEADOS que referencia a ROLES
  as: "sucursal", // Alias para acceder al rol del empleado
});