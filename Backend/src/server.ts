import cors from "cors";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import db from "./config/database";
import { RegisterRoutes } from "./routes";

const app = express();
const port = process.env.PORT || 3000;

const dbPath = path.join(__dirname, "..", "Database.db");

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

// Configuration CORS
app.use(
  cors({
    origin: "http://localhost:5173", // URL de votre frontend Vue
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.static("public"));
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

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

async function initDb() {
  try {
    await db.sync({
      force: false,
      alter: false,
      logging: false,
    });
    console.log("✅ Base de données synchronisée avec succès");
  } catch (error) {
    console.error(
      "❌ Erreur lors de la synchronisation de la base de données:",
      error
    );
    throw error;
  }
}

async function startServer() {
  try {
    await db.authenticate();
    console.log("✅ Connexion à la base de données établie avec succès.");

    // Initialiser/synchroniser la base de données
    await initDb();

    app.listen(port, () => {
      console.log(`🚀 Serveur en cours d'exécution sur le port ${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    // En cas d'erreur, fermer proprement la connexion
    await db.close();
  }
}

startServer();

export default initDb;
