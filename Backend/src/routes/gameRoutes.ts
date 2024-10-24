import express from "express";

const router = express.Router();

router.post("/", (req, res) => {
  // Logique de création d'une partie
  res.send("Création d'une nouvelle partie");
});

router.get("/", (req, res) => {
  // Logique de récupération des parties
  res.send("Liste des parties");
});

router.get("/:id", (req, res) => {
  // Logique de récupération d'une partie spécifique
  res.send(`Détails de la partie ${req.params.id}`);
});

router.put("/:id", (req, res) => {
  // Logique de mise à jour d'une partie
  res.send(`Mise à jour de la partie ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  // Logique de suppression d'une partie
  res.send(`Suppression de la partie ${req.params.id}`);
});

router.get("/public", (req, res) => {
  // Logique de récupération des parties publiques
  res.send("Liste des parties publiques");
});

export default router;
