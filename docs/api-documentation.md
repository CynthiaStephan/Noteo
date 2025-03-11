# 📌 **Documentation de l'API**

## 📖 **Introduction**
Bienvenue dans la documentation de l'API **Noteo**.  
- **Base URL** : `http://localhost:5000/`
- **Format des données** : JSON
- **Authentification** : JWT (stocké dans un cookie sécurisé)

---

## 🔑 **Authentification**
Toutes les requêtes nécessitent un **JWT** valide. Le token est stocké dans un **cookie HTTP-only** et est envoyé automatiquement avec chaque requête si `credentials: include` est activé côté client.

### **# Connexion**
- **URL** : `/auth/login`
- **Méthode** : `POST`
- **Description** : Permet à un utilisateur de se connecter. Un token JWT est généré et envoyé dans un cookie HTTP-only.
- **Corps de la requête** :
  ```json
  {
    "email": "user@example.com",
    "password": "motdepasse"
  }
  ```
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "id": 1,
      "role": "admin"
    }
    ```
  - **Cookies** : Un cookie `token` est envoyé pour les requêtes suivantes.

### **# Déconnexion**
- **URL** : `/auth/logout`
- **Méthode** : `POST`
- **Description** : Permet à un utilisateur de se déconnecter en supprimant le cookie contenant le token JWT.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "message": "Successfully logged out"
    }
    ```
  - **Cookies** : Le cookie `token` est supprimé.

### **# Inscription**
- **URL** : `/auth/register`
- **Méthode** : `POST`
- **Description** : Permet à un nouvel utilisateur de s'enregistrer. Le mot de passe est haché avant d'être enregistré.
- **Corps de la requête** :
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "role": "intern",
    "training_id": 1
  }
  ```
- **Réponse** :
  - **Code** : `201 Created`
  - **Corps** :
    ```json
    {
      "user_id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "role": "intern"
    }
    ```

---

## 📂 **Utilisateurs**

### **# Récupérer tous les utilisateurs**
- **URL** : `/user`
- **Méthode** : `GET`
- **Description** : Récupère la liste de tous les utilisateurs. Le mot de passe est exclu de la réponse.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    [
      {
        "user_id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "johndoe@example.com",
        "role": "intern"
      }
    ]
    ```

---

### **# Récupérer un utilisateur par ID**
- **URL** : `/user/:user_id`
- **Méthode** : `GET`
- **Description** : Récupère un utilisateur spécifique par son identifiant. Le mot de passe est exclu de la réponse.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "user_id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "role": "intern"
    }
    ```

---

### **# Créer un utilisateur**
- **URL** : `/user/new`
- **Méthode** : `POST`
- **Description** : Crée un nouvel utilisateur. Le mot de passe est haché avant d'être enregistré.
- **Corps de la requête** :
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "role": "intern"
  }
  ```
- **Réponse** :
  - **Code** : `201 Created`
  - **Corps** :
    ```json
    {
      "user_id": 1,
      "first_name": "John",
      "last_name": "Doe",
      "email": "johndoe@example.com",
      "role": "intern"
    }
    ```

---

### **# Mettre à jour un utilisateur**
- **URL** : `/user/:user_id`
- **Méthode** : `PUT`
- **Description** : Met à jour les informations d'un utilisateur existant par son identifiant. Le mot de passe est haché si fourni.
- **Corps de la requête** :
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "password": "newpassword",
    "role": "admin"
  }
  ```
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "message": "Utilisateur mis à jour"
    }
    ```

---

### **# Supprimer un utilisateur**
- **URL** : `/user/:user_id`
- **Méthode** : `DELETE`
- **Description** : Supprime un utilisateur par son identifiant.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "message": "Utilisateur supprimé"
    }
    ```

---

## 📂 **Questionnaires**

### **# Récupérer tous les questionnaires**
- **URL** : `/questionnaire`
- **Méthode** : `GET`
- **Description** : Récupère la liste de tous les questionnaires.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    [
      {
        "questionnaire_id": 1,
        "title": "Questionnaire 1",
        "user_id": 2
      }
    ]
    ```

---

### **# Récupérer un questionnaire par ID**
- **URL** : `/questionnaire/:questionnaire_id`
- **Méthode** : `GET`
- **Description** : Récupère un questionnaire spécifique par son identifiant.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "questionnaire_id": 1,
      "title": "Questionnaire 1",
      "user_id": 2
    }
    ```

---

### Créer un questionnaire
- **URL** : `/questionnaire/new/:trainer_id`
- **Méthode** : `POST`
- **Description** : Crée un nouveau questionnaire pour un utilisateur spécifique avec des questions et des utilisateurs associés.
- **Corps de la requête** :

```json
{
  "title": "Nouveau questionnaire",
  "question_ids": [1, 2, 5],
  "user_ids": [1, 2]
}
```

- **Réponse** :
  - **Code** : `201 Created`
  - **Corps** :

```json
{
  "questionnaire_id": 3,
  "title": "Nouveau questionnaire",
  "user_id": 2,
  "questions": [
    {"question_id": 1, "question": "Question 1"},
    {"question_id": 2, "question": "Question 2"},
    {"question_id": 5, "question": "Question 5"},
  ],
  "users": [
    {"user_id": 1, "first_name": "Alice", "last_name": "Smith"},
    {"user_id": 2, "first_name": "Bob", "last_name": "Johnson"}
  ]
}
```

---

### **# Mettre à jour un questionnaire**
- **URL** : `/questionnaire/update/:questionnaire_id`
- **Méthode** : `PUT`
- **Description** : Met à jour le titre d'un questionnaire existant par son identifiant.
- **Corps de la requête** :
  ```json
  {
    "title": "Titre mis à jour"
  }
  ```
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "questionnaire_id": 1,
      "title": "Titre mis à jour",
      "user_id": 2
    }
    ```

---

### **# Supprimer un questionnaire**
- **URL** : `/questionnaire/:questionnaire_id`
- **Méthode** : `DELETE`
- **Description** : Supprime un questionnaire par son identifiant.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "message": "Successfully deleted"
    }
    ```

---

## 📂 **Questions**

### **# Récupérer toutes les questions**
- **URL** : `/question`
- **Méthode** : `GET`
- **Description** : Récupère la liste de toutes les questions.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    [
      {
        "question_id": 1,
        "question": "Description de compétence"
      }
    ]
    ```

---

### **# Récupérer une question par ID**
- **URL** : `/question/:question_id`
- **Méthode** : `GET`
- **Description** : Récupère une question spécifique par son identifiant.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "question_id": 1,
      "question": "Description de compétence"
    }
    ```

---

### **# Mettre à jour une question**
- **URL** : `/question/update/:question_id`
- **Méthode** : `PUT`
- **Description** : Met à jour une question existante par son identifiant.
- **Corps de la requête** :
  ```json
  {
    "question": "Question mise à jour"
  }
  ```
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "question_id": 1,
      "question": "Question mise à jour"
    }
    ```

---

### **# Supprimer une question**
- **URL** : `/question/:question_id`
- **Méthode** : `DELETE`
- **Description** : Supprime une question par son identifiant.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "message": "Successfully deleted"
    }
    ```

## 📂 **Réponses (Answers)**

### **# Récupérer toutes les réponses**
- **URL** : `/answer`
- **Méthode** : `GET`
- **Description** : Récupère toutes les réponses disponibles.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    [
      {
        "answer_id": 1,
        "user_id": 2,
        "question_id": 5,
        "response": "La réponse de l'utilisateur"
      }
    ]
    ```

### **# Récupérer une réponse par ID**
- **URL** : `/answer/:answer_id`
- **Méthode** : `GET`
- **Description** : Récupère une réponse spécifique par son identifiant.
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
    {
      "answer_id": 1,
      "user_id": 2,
      "question_id": 5,
      "response": "La réponse de l'utilisateur"
    }
    ```

### **# Récupérer les réponses d'un utilisateur à un questionnaire**
- **URL** : `/answer/results/:questionnaire_id/:user_id`
- **Méthode** : `GET`
- **Description** : Récupère toutes les réponses d'un utilisateur pour un questionnaire donné.
- **Corps de la requête** :
  ```json
  {
    "user_id": 2
  }
  ```
- **Réponse** :
  - **Code** : `200 OK`
  - **Corps** :
    ```json
      {
      "userAnswers": {
          "user_id": 1,
          "first_name": "Jean",
          "last_name": "Dupont",
          "role": "intern",
          "assigned_users": [
              {
                  "questionnaire_id": 1,
                  "title": "Super questionnaire",
                  "questions": [
                      {
                          "question_id": 2,
                          "question": "Maîtrisez-vous les bases de JavaScript ?",
                          "answers": [
                              {
                                  "user_id": 1,
                                  "intern_answer": 12
                              },
                              {
                                  "user_id": 2,
                                  "intern_answer": 5
                              }
                          ]
                      },
                  ]
              }
          ]
      }
  }

    ```

---

## 🛑 **Erreurs courantes**

| **Code** | **Message**               | **Explication**                                                                 |
|----------|---------------------------|---------------------------------------------------------------------------------|
| 400      | Bad Request               | Requête invalide ou paramètres manquants.                                       |
| 401      | Unauthorized              | Token JWT invalide ou non fourni.                                               |
| 403      | Forbidden                 | Accès refusé.                                                                  |
| 404      | Not Found                 | Ressource non trouvée.                                                         |
| 500      | Server Error              | Erreur interne du serveur.                                                     |
