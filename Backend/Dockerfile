# Étape de build
FROM node:18-alpine as builder

WORKDIR /app

# Copier d'abord les fichiers de dépendances pour optimiser le cache Docker
COPY package*.json ./
RUN npm ci

# Copier tous les fichiers nécessaires pour le build
COPY . .

# Build de l'application avec plus de logs
RUN npm run build --verbose

# Étape de production
FROM node:18-alpine

WORKDIR /app

# Copier uniquement les fichiers nécessaires
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copier uniquement les fichiers buildés depuis l'étape précédente
COPY --from=builder /app/build ./build

# Définir les variables d'environnement pour la production
ENV NODE_ENV=production

# Exposer le port de l'application
EXPOSE 3000

# Commande de démarrage
CMD ["node", "build/app.js"]