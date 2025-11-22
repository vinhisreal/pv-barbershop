const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PV Barbershop Appointment Service API",
      version: "1.0.0",
      description:
        "API documentation for PV Barbershop Appointment Service",
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api/v1`,
      },
    ],
  },
  apis: ["./**/*.swagger.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerUi, swaggerSpec };
