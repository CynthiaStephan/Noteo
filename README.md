# Note : Application d'Évaluation des Étudiants

Une application web permettant aux étudiants de s'auto-évaluer et aux formateurs d'évaluer leurs étudiants. Elle offre des visualisations graphiques interactives pour comparer les résultats et identifier les écarts d'apprentissage, facilitant ainsi le suivi pédagogique.

## 📋 Présentation

L'objectif de cette application est de permettre aux étudiants de s'auto-évaluer et aux formateurs d'évaluer leurs étudiants. L'application offre la possibilité de comparer les résultats sous forme de graphiques interactifs pour visualiser les écarts et tendances d'apprentissage.

## Documentation

* **[Documentation de l'API](./docs/api-documentation.md)**
* **[Gestion des Branches GitHub](./docs/git-guidelines.md)**
* **[Gestion des Contenaires Docker](./docs/docker-guidelines.md)**

## ✨ Fonctionnalités principales

### Pour les étudiants

- S'inscrire et se connecter pour accéder à un espace personnel
- Remplir des questionnaires d'auto-évaluation pour suivre sa progression
- Consulter ses résultats sous forme de graphiques

### Pour les formateurs

- Créer et gérer des questionnaires d'évaluation pour les étudiants
- Évaluer les étudiants en attribuant des notes (même questionnaire)
- Visualiser et comparer les résultats sous forme de graphiques
- Filtrer les résultats par période ou étudiant
- Exporter les résultats sous format PDF et Excel

### Pour les administrateurs

- Gérer les comptes utilisateurs (création, modification, suppression)
- Paramétrer les rôles des utilisateurs
- Supervision globale du système

## 🔧 Technologies utilisées

- **Frontend** : React.js, Chart.js
- **Backend** : Node.js,
- **Base de données** : MySQL
- **Sécurité** : Gestion des rôles et permissions
- **Environnement** : GitHub

## Documentation Technique

- **server/readme.md**
- **client/readme.md**

## 🚀 Installation

```bash
# Cloner le dépôt
git clone <https://github.com/CynthiaStephan/Noteo>

# Lancement avec Docker
docker-compose up -d --build
```

## Auteurs

Développé dans le cadre d'un projet pédagogique par :