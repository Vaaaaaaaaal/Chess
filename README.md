# Projet Application Échec - Julien Delcuse Robert

## Description
Ce projet est réalisé dans le cadre du BUT Informatique 3ème année, module Javascript Back-end et Front-end. Il s'agit de développer une application de jeu d'échecs avec une architecture client-serveur en TypeScript. Le projet est réalisé par groupe de 2 ou 3 étudiants.

### Intervenant :
- **Julien Delcuse Robert**

## Technologies utilisées
- **Serveur :** TypeScript, Express, Sequelize (ORM)
- **Client :** TypeScript, VueJS, PrimeVue (bibliothèque de composants)
- **Base de données :** Base de données relationnelle open source (choix libre)

## Objectifs
Développer une application Web d’échecs avec les fonctionnalités suivantes :
- Gestion des comptes utilisateurs (connexion via login/mot de passe)
- Jouer une partie sur le même ordinateur avec un ami non connecté
- Accéder à l’historique des parties et les revisualiser
- Rendre ses parties publiques
- Générer des statistiques des anciennes parties
- Créer un classement des utilisateurs

## Fonctionnalités principales
1. **Gestion des utilisateurs :**
   - Connexion via login/mot de passe
   - Échanges sécurisés Back/Front avec un Bearer Token

2. **Partie d’échecs :**
   - Déplacements classiques des pièces et promotion
   - Visualisation des mouvements possibles en cliquant sur une pièce
   - Rotation du plateau entre chaque tour pour que chaque joueur ait son côté en bas de l’écran

3. **Interface :**
   - Écran de jeu
   - Écran de gestion du profil utilisateur
   - Écran de classement
   - Écran de consultation de l’historique des parties

## Consignes techniques
- Utilisation d'une base de données relationnelle open source et gratuite
- Implémentation des règles classiques des échecs (sans coups spéciaux comme le roque)
- Rendu du projet sur GitHub, avec :
  - Le code source du back-end
  - Le code source du front-end
  - Un fichier SQL ou SQLite pour initialiser le schéma de la base de données

## Installation et exécution

### Prérequis
- Node.js installé
- Base de données relationnelle (ex : PostgreSQL, SQLite)

### Étapes d'installation
1. **Cloner le dépôt :**
   ```bash
   git clone https://github.com/votre-repo/projet-echec.git
