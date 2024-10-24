import express from "express";
import path from "path";
import { Sequelize } from "sequelize";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { RegisterRoutes } from "./routes";

const app = express();
const port = process.env.PORT || 3000;

const dbPath = path.join(__dirname, "..", "Database.db");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: dbPath,
});

// Configuration Swagger
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API Serveur",
      version: "1.0.0",
      description: "API de base pour le serveur",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ["./src/routes/*.ts"], // Chemin vers vos fichiers contenant les commentaires Swagger
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use(express.json());

/**
 * @swagger
 * /:
 *   get:
 *     summary: Page d'accueil
 *     responses:
 *       200:
 *         description: Message de bienvenue
 */
app.get("/", (req, res) => {
  res.send("Serveur TypeScript avec Express, Sequelize et Swagger");
});

RegisterRoutes(app);

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de données établie avec succès.");

    app.listen(port, () => {
      console.log(`Serveur en cours d'exécution sur le port ${port}`);
    });
  } catch (error) {
    console.error("Impossible de se connecter à la base de données:", error);
  }
}

startServer();
