# Guide d'utilisation de Docker avec Node.js

Ce guide explique comment utiliser Docker pour exécuter et arrêter un conteneur pour une application Node.js.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :
- [Docker](https://www.docker.com/get-started)

## Lancer un conteneur avec Docker Compose

### 1. Démarrer les conteneurs en arrière-plan
Pour démarrer les conteneurs définis dans `docker-compose.yml` en mode détaché (arrière-plan) :
```sh
docker compose up -d
```
Cela permet de lancer les services sans afficher leurs logs directement dans le terminal.

### 2. Construire et démarrer les conteneurs
Si vous avez modifié le `Dockerfile` ou les dépendances et souhaitez reconstruire l’image avant de démarrer :
```sh
docker compose up -d --build
```
Cette commande force la reconstruction des images avant le démarrage.

### 3. Arrêter et supprimer les conteneurs
Pour arrêter et supprimer les conteneurs associés à `docker-compose.yml` :
```sh
docker compose down
```
Cela arrête les services et supprime les conteneurs tout en conservant les volumes et réseaux définis.


