import express from "express";

const router = express.Router();

router.post("/:gameId/moves", (req, res) => {
  // Logique d'ajout d'un mouvement
  res.send(`Ajout d'un mouvement à la partie ${req.params.gameId}`);
});

router.get("/:gameId/moves", (req, res) => {
  // Logique de récupération des mouvements d'une partie
  res.send(`Mouvements de la partie ${req.params.gameId}`);
});

export default router;
