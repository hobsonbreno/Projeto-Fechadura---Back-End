const swaggerJsdoc = require("swagger-jsdoc");
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Student API",
      version: "1.0.0",
      description: "API para gerenciamento de estudantes",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Student: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64f6c9f25b4f9e3d2b9a1234"
            },
            name: {
              type: "string",
              example: "Maria Silva"
            },
            email: {
              type: "string",
              example: "maria@email.com"
            },
            age: {
              type: "integer",
              example: 22
            },
            enrolled: {
              type: "boolean",
              example: true
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-09-01T12:00:00Z"
            },
            updatedAt: {
              type: "string",
              format: "date-time",
              example: "2023-09-01T12:00:00Z"
            }
          },
          required: ["name", "email", "enrolled"],
        }
      }
    }
  },
  apis: ["./src/routes/*.ts"], // mantém o seu padrão
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
