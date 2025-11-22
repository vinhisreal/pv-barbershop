const swaggerJSDoc = require("swagger-jsdoc");

const PORT = process.env.PORT || 5000;

const options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "API Gateway - Service Routes",
      version: "1.0.0",
      description: "Tài liệu API quản lý Service Routes cho API Gateway",
    },
    servers: [
      {
        url: `http://localhost:${PORT}`,
      },
    ],
    tags: [
      {
        name: "Service Routes",
        description: "Quản lý routes dùng để proxy tới các service đích",
      },
    ],
  },
  apis: ["./src/docs/*.swagger.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };
