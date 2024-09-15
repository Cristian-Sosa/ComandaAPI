const Usuarios = require("../models/Usuarios");
const RegUsuarios = require("../models/RegUsuarios");
const tokenDecoded = require("./tokenDecoded");

actionsRegister = async (request, obs) => {
  const userId = tokenDecoded(request.headers.authorization);
  let endpoint;
  const controllerName = request.originalUrl.replace('/', '').split("/");

  controllerName.length > 0
    ? (endpoint = controllerName[0].concat(" - ", controllerName[1]))
    : (endpoint = controllerName[0]);

  try {
    const oUser = await Usuarios.findOne({ where: { id: userId.id } });
    await RegUsuarios.create({
      usuario_id: userId.id + ' - ' + oUser.usuario,
      fecha: new Date(),
      accion: endpoint,
      observaciones: obs,
    });
  } catch (error) {
    console.log({ errorRegistros: error });
  }
};

module.exports = actionsRegister;
