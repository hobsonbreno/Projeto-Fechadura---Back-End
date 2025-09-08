import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger";

// Carrega variáveis de ambiente
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI;

if (!MONGO_URI) {
  console.error("❌ MONGODB_URI não está definida no arquivo .env");
  process.exit(1);
}

// Conexão com MongoDB
mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Conectado ao MongoDB");

    // Middleware
    app.use(express.json());

    // Rotas
    app.use("/students", studentRoutes);

    // Swagger
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    // Inicia o servidor
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📚 Swagger UI: http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error("❌ Erro ao conectar ao MongoDB:", err.message);
    process.exit(1);
  });
