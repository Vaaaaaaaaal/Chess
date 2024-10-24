import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  // Logique de récupération du classement
  res.send("Classement global");
});

router.get("/users/:id/stats", (req, res) => {
  // Logique de récupération des statistiques d'un utilisateur
  res.send(`Statistiques de l'utilisateur ${req.params.id}`);
});

export default router;
