# Schéma de la Base de Données - Application Échec

## 1. Utilisateurs (`users`)

Cette table contient les informations relatives aux utilisateurs inscrits.

| Colonne         | Type           | Contraintes                     |
| --------------- | -------------- | ------------------------------- |
| `id`            | `INT`          | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `username`      | `VARCHAR(255)` | `UNIQUE`, `NOT NULL`            |
| `email`         | `VARCHAR(255)` | `UNIQUE`, `NOT NULL`            |
| `password_hash` | `VARCHAR(255)` | `NOT NULL`                      |
| `created_at`    | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`     |

## 2. Parties d'échecs (`games`)

Cette table stocke les informations relatives aux parties d'échecs jouées.

| Colonne      | Type           | Contraintes                           |
| ------------ | -------------- | ------------------------------------- |
| `id`         | `INT`          | `PRIMARY KEY`, `AUTO_INCREMENT`       |
| `player1_id` | `INT`          | `FOREIGN KEY (users.id)`              |
| `username2`  | `VARCHAR(255)` | `NOT NULL`                            |
| `winner_id`  | `BOOL`         |                                       |
| `is_public`  | `BOOLEAN`      | `DEFAULT FALSE`                       |
| `created_at` | `TIMESTAMP`    | `DEFAULT CURRENT_TIMESTAMP`           |
| `game_state` | `TEXT`         | Stockage de l'état final de la partie |

## 3. Mouvements (`moves`)

Cette table contient les mouvements effectués lors des parties.

| Colonne       | Type          | Contraintes                     |
| ------------- | ------------- | ------------------------------- |
| `id`          | `INT`         | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `game_id`     | `INT`         | `FOREIGN KEY (games.id)`        |
| `move_number` | `INT`         | Numéro du coup (1, 2, 3, etc.)  |
| `move_from`   | `VARCHAR(10)` | Stockage du coup (ex : "e2")    |
| `move_to`     | `VARCHAR(10)` | Stockage du coup (ex : "e4")    |
| `created_at`  | `TIMESTAMP`   | `DEFAULT CURRENT_TIMESTAMP`     |

## 4. Classement (`leaderboard`)

Cette table contient le classement des utilisateurs basé sur leurs performances.

| Colonne       | Type  | Contraintes                     |
| ------------- | ----- | ------------------------------- |
| `id`          | `INT` | `PRIMARY KEY`, `AUTO_INCREMENT` |
| `user_id`     | `INT` | `FOREIGN KEY (users.id)`        |
| `total_games` | `INT` |                                 |
| `wins`        | `INT` |                                 |
| `losses`      | `INT` |                                 |
| `draws`       | `INT` |                                 |
