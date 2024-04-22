# Utilisez l'image officielle Node.js comme base
FROM node:14.17.0 AS build

# Définissez le répertoire de travail
WORKDIR /app

# Copiez les fichiers du projet dans le conteneur
COPY . .

# Installez les dépendances et construisez l'application
RUN npm install
RUN npm run build

# Configuration de l'image NGINX pour servir l'application construite
FROM nginx:alpine
COPY --from=build /app/dist/angular-app /usr/share/nginx/html
