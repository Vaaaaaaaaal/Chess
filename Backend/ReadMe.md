# Schéma de la Base de Données & API - Application Échec

# API

### 1. Utilisateurs (`users`)

Cette table contient les informations relatives aux utilisateurs inscrits.

| Colonne         | Type           | Contraintes                     |
| --------------- | -------------- | ------------------------------- |
| `id`            | `INT`          | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `username`      | `VARCHAR(255)` | `UNIQUE`, `NOT NULL`            |
| `email`         | `VARCHAR(255)` | `UNIQUE`, `NOT NULL`            |
| `password_hash` | `VARCHAR(255)` | `NOT NULL`                      |
| `created_at`    | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`     |

### 2. Parties d'échecs (`games`)

Cette table stocke les informations relatives aux parties d'échecs jouées.

| Colonne      | Type           | Contraintes                             |
| ------------ | -------------- | --------------------------------------- |
| `id`         | `INT`          | `PRIMARY KEY`, `AUTO_INCREMENT`         |
| `player1_id` | `INT`          | `FOREIGN KEY (users.id)`                |
| `username2`  | `VARCHAR(255)` | `NOT NULL`                              |
| `winner_id`  | `BOOL`         |                                         |
| `is_public`  | `BOOLEAN`      | `DEFAULT FALSE`                         |
| `created_at` | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`             |
| `game_state` | `TEXT`         | `Stockage de l'état final de la partie` |

### 3. Mouvements (`moves`)

Cette table contient les mouvements effectués lors des parties.

| Colonne       | Type          | Contraintes                     |
| ------------- | ------------- | ------------------------------- |
| `id`          | `INT`         | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `game_id`     | `INT`         | `FOREIGN KEY (games.id)`        |
| `move_number` | `INT`         | Numéro du coup (1, 2, 3, etc.)  |
| `move`        | `VARCHAR(10)` | Stockage du coup (ex : "Ke4")   |
| `created_at`  | `TIMESTAMP`   | `DEFAULT CURRENT_TIMESTAMP`     |

### 4. Classement (`leaderboard`)

Cette table contient le classement des utilisateurs basé sur leurs performances.

| Colonne       | Type  | Contraintes                     |
| ------------- | ----- | ------------------------------- |
| `id`          | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `user_id`     | `INT` | `FOREIGN KEY (users.id)`        |
| `total_games` | `INT` |                                 |
| `wins`        | `INT` |                                 |
| `losses`      | `INT` |                                 |
| `draws`       | `INT` |                                 |

## API Routes

### 1. Utilisateurs

- **POST /register** : Inscription d'un nouvel utilisateur (nom d'utilisateur, email, mot de passe)
- **POST /login** : Connexion avec login/mot de passe, retourne un Bearer Token
- **GET /profile** : Récupérer les informations du profil de l'utilisateur connecté
- **PUT /profile** : Modifier les informations du profil de l'utilisateur connecté
- **GET /profile/:id/stats** : Obtenir des statistiques globales sur un utilisateur (nombre de parties, victoires, défaites)

### 2. Parties d'échecs

- **POST /games** : Créer une nouvelle partie d'échecs (joueur 1 contre joueur 2)
- **GET /games/:id** : Récupérer les informations d'une partie spécifique
- **GET /games/history** : Récupérer l'historique des parties de l'utilisateur connecté
- **PUT /games/:id/move** : Envoyer un coup joué dans la partie en spécifiant la pièce déplacée et la position
- **GET /games/public** : Récupérer les parties publiques
- **GET /games/:id/stats** : Obtenir des statistiques sur une partie spécifique (ex : nombre de coups, durée)

### 3. Classement

- **GET /leaderboard** : Récupérer le classement des joueurs basé sur leurs performances (victoires, défaites, matchs nuls)
- **GET /leaderboard/:id** : Récupérer le classement d'un utilisateur spécifique
