# Noteo : Plateforme d'Évaluation et de Suivi Pédagogique
![Version](https://img.shields.io/badge/version-1.0.0-blue)
![Statut](https://img.shields.io/badge/statut-en%20développement-yellow)

Noteo est une application web innovante qui simplifie l'évaluation des étudiants et le suivi pédagogique grâce à des outils interactifs et des visualisations graphiques.

## 📋 Présentation

Noteo permet aux étudiants de mieux comprendre leurs forces et leurs faiblesses grâce à des auto-évaluations régulières, tout en offrant aux formateurs des outils puissants pour suivre la progression de leurs étudiants et adapter leur enseignement.

## 📚 Documentation

* **[Documentation de l'API](./docs/api-documentation.md)**
* **[Gestion des Branches GitHub](./docs/git-guidelines.md)**
* **[Gestion des Contenaires Docker](./docs/docker-guidelines.md)**

## ✨ Fonctionnalités principales

### Pour les étudiants
- S'inscrire et se connecter pour accéder à un espace personnel.
- Remplir des questionnaires d'auto-évaluation pour suivre sa progression.
- Consulter ses résultats sous forme de graphiques interactifs.

### Pour les formateurs
- Créer et gérer des questionnaires d'évaluation pour les étudiants.
- Visualiser et comparer les résultats sous forme de graphiques.
- Filtrer les résultats par période ou étudiant.
- Exporter les résultats sous format PDF et Excel.

### Pour les administrateurs
- Gérer les comptes utilisateurs (création, modification, suppression).
- Paramétrer les rôles des utilisat


## 🔧 Technologies utilisées

- **Frontend** : React.js, Chart.js
- **Backend** : Node.js, Express, JWT
- **Base de données** : MySQL
- **Sécurité** : Gestion des rôles et permissions
- **Environnement** : GitHub

## Documentation Technique

- **[server/readme.md](./server/readme.md)**
- **[client/readme.md](./client/readme.md)**

## 🚀 Installation

### Cloner le dépôt
```bash
git clone https://github.com/CynthiaStephan/Noteo
```
### Configuration des variables d’environnement

Crée un fichier `.env` à la racine et ajoute :

```env
    DB_USER=root
    DB_PASSWORD=motdepasse
    DB_NAME=bd_name
    SERVER_PORT=5000

    JWT_SECRET=Secret
```
### Lancement avec Docker

```bash
docker-compose up -d --build
```

## Auteurs

Développé dans le cadre d'un projet pédagogique par :

<a href="https://github.com/CynthiaStephan/Noteo/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=CynthiaStephan/Noteo" />
</a>

[Jordan](https://github.com/jordanbayer) `Frontend`  
[Malcom](https://github.com/Malcolm-noel) `Frontend`  
[Pierre-Marie](https://github.com/DovaaCode) `Backend`  
[Julie](https://github.com/juliemeurisse) `Backend`  
[Cynthia](https://github.com/CynthiaStephan) `Backend`, `Gestion de projet`