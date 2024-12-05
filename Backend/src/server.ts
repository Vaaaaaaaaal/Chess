import cors from "cors";
import express from "express";
import path from "path";
import swaggerUi from "swagger-ui-express";
import db from "./config/database";
import { expressAuthentication } from "./middleware/auth.middleware";
import { RegisterRoutes } from "./routes";
import initDatabase from "./config/initDatabase";

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

// Ajout du middleware d'authentification global
app.use((req, res, next) => {
  if (req.headers.authorization) {
    expressAuthentication(req, "jwt", [])
      .then(() => next())
      .catch((error) => {
        res.status(401).json({ message: error.message });
      });
  } else {
    next();
  }
});

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
    await db.authenticate();
    console.log("✅ Connexion à la base de données établie avec succès.");

    // Ne pas forcer la synchronisation
    await db.sync({ alter: false });
    console.log("✅ Base de données synchronisée avec succès");

    app.listen(port, () => {
      console.log(`🚀 Serveur en cours d'exécution sur le port ${port}`);
    });
  } catch (error) {
    console.error("❌ Erreur serveur:", error);
    process.exit(1); // Arrête complètement le processus en cas d'erreur
  }
}

startServer();

export default initDatabase;
