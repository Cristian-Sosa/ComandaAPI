const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API de sistema de Comandas",
    version: "1.0.0",
    description: "Documentación de la API de BackOffice de comandas",
  },
  basePath: "/",
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  // Archivos que contienen comentarios JSDoc para documentar tus API
  apis: ["./src/core/routes/*.js", "./src/core/data/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
