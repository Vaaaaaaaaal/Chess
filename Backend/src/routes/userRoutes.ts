import express from "express";

const router = express.Router();

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Inscription d'un nouvel utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Utilisateur inscrit avec succès
 *       400:
 *         description: Données d'inscription invalides
 */
router.post("/register", (req, res) => {
  // Logique d'inscription
  res.send("Inscription utilisateur");
});

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Connexion d'un utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Connexion réussie
 *       401:
 *         description: Identifiants invalides
 */
router.post("/login", (req, res) => {
  // Logique de connexion
  res.send("Connexion utilisateur");
});

/**
 * @swagger
 * /api/users/profile:
 *   get:
 *     summary: Récupération du profil utilisateur
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Profil utilisateur récupéré avec succès
 *       401:
 *         description: Non autorisé
 */
router.get("/profile", (req, res) => {
  // Logique de récupération du profil
  res.send("Profil utilisateur");
});

/**
 * @swagger
 * /api/users/profile:
 *   put:
 *     summary: Mise à jour du profil utilisateur
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profil mis à jour avec succès
 *       400:
 *         description: Données de mise à jour invalides
 *       401:
 *         description: Non autorisé
 */
router.put("/profile", (req, res) => {
  // Logique de mise à jour du profil
  res.send("Mise à jour du profil utilisateur");
});

export default router;
