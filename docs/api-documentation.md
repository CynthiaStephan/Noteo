# 📌 **Documentation de l'API**

## 📖 Introduction
Bienvenue dans la documentation de l'API **Noteo**.  

- **Base URL** : `http://localhost:5000/`
- **Format** : JSON
- **Authentification** : JWT (stocké dans les cookies)

---

## 🔑 **Authentification**
Toutes les requêtes nécessitent un **JWT** valide. Le token est stocké dans un **cookie** sécurisé et est envoyé automatiquement avec chaque requête si `credentials: include` est activé côté client.

### **Comment ça marche ?**
1. **Connexion** : Lors de la connexion, un **cookie HTTP-only** contenant le JWT est envoyé au client.
2. **Authentification dans les requêtes suivantes** : Pour chaque requête suivante, le cookie est envoyé automatiquement grâce à la configuration `credentials: include` sur le front-end.

---

## 📂 **Endpoints**

Voici la documentation générée pour tes contrôleurs et routes d'authentification, avec les informations adaptées à l'utilisation des cookies pour gérer le JWT :

---

### 📝 **1. Authentification**

#### 🔹 **Connexion**
- **URL** : `/auth/login`
- **Méthode** : `POST`
- **Description** : Permet à un utilisateur de se connecter. Un token JWT est généré et envoyé dans un cookie HTTP-only pour être utilisé dans les requêtes suivantes.

📥 **Requête** :
```json
{
  "email": "user@example.com",
  "password": "motdepasse"
}
```

📤 **Réponse** :
- **Status 200** : Si la connexion est réussie, un cookie contenant le JWT est envoyé avec la réponse. Le cookie est configuré avec `httpOnly` pour empêcher l'accès au token via JavaScript côté client.
  - **Exemple de réponse** :
  ```json
  {
    "id": 1,
    "role": "admin"
  }
  ```
- **Cookies** :
  - `token`: Contient le JWT pour l'authentification future.
  - `testCookie`: Un cookie supplémentaire pour les tests (optionnel).

---

#### 🔹 **Déconnexion**
- **URL** : `/auth/logout`
- **Méthode** : `POST`
- **Description** : Permet à un utilisateur de se déconnecter en supprimant le cookie contenant le token JWT.

📥 **Requête** : 
Aucune donnée nécessaire dans le corps de la requête.

📤 **Réponse** :
- **Status 200** : Si la déconnexion est réussie, le cookie `token` est supprimé.
  - **Exemple de réponse** :
  ```json
  {
    "message": "Successfully logged out"
  }
  ```
- **Cookies** :
  - `token`: Supprimé.

---

#### 🔹 **Enregistrement (Inscription)**
- **URL** : `/auth/register`
- **Méthode** : `POST`
- **Description** : Permet à un nouvel utilisateur de s'enregistrer. Le mot de passe est haché avant d'être enregistré en base de données.

📥 **Requête** :
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "email": "johndoe@example.com",
  "password": "securepassword",
  "role": "user"
}
```

📤 **Réponse** :
- **Status 201** : Si l'enregistrement est réussi, un objet contenant les informations de l'utilisateur est renvoyé.
  - **Exemple de réponse** :
  ```json
  {
    "user_id": 1,
    "first_name": "John",
    "last_name": "Doe",
    "email": "johndoe@example.com",
    "role": "user"
  }
  ```

  Voici la documentation pour les routes de gestion des questionnaires, adaptée à ton code :

---

### 📝 **3. Questionnaires**

#### 🔹 **Obtenir tous les questionnaires**
- **URL** : `/questionnaires`
- **Méthode** : `GET`
- **Description** : Récupère la liste de tous les questionnaires.

📤 **Réponse** :
- **Status 200** : Si des questionnaires sont trouvés, une liste de tous les questionnaires est renvoyée.
  - **Exemple de réponse** :
  ```json
  [
    {
      "questionnaire_id": 1,
      "title": "Questionnaire 1",
      "user_id": 2
    },
    {
      "questionnaire_id": 2,
      "title": "Questionnaire 2",
      "user_id": 3
    }
  ]
  ```
- **Status 404** : Si aucun questionnaire n'est trouvé.
  - **Exemple de réponse** :
  ```json
  {
    "error": "Questionnaire not found"
  }
  ```

---

#### 🔹 **Obtenir un questionnaire par ID**
- **URL** : `/questionnaires/:questionnaire_id`
- **Méthode** : `GET`
- **Description** : Récupère un questionnaire spécifique par son identifiant.

📤 **Réponse** :
- **Status 200** : Si le questionnaire est trouvé, il est renvoyé.
  - **Exemple de réponse** :
  ```json
  {
    "questionnaire_id": 1,
    "title": "Questionnaire 1",
    "user_id": 2
  }
  ```
- **Status 404** : Si le questionnaire n'est pas trouvé.
  - **Exemple de réponse** :
  ```json
  {
    "error": "Questionnaire not found"
  }
  ```

---

#### 🔹 **Créer un questionnaire**
- **URL** : `/questionnaires/:user_id`
- **Méthode** : `POST`
- **Description** : Crée un nouveau questionnaire pour un utilisateur spécifique.

📥 **Requête** :
```json
{
  "title": "Nouveau questionnaire"
}
```

📤 **Réponse** :
- **Status 200** : Si la création du questionnaire est réussie, un objet contenant les informations du questionnaire est renvoyé.
  - **Exemple de réponse** :
  ```json
  {
    "questionnaire_id": 3,
    "title": "Nouveau questionnaire",
    "user_id": 2
  }
  ```
- **Status 404** : Si le titre du questionnaire est vide.
  - **Exemple de réponse** :
  ```json
  {
    "error": "Questionnaire's title can't be empty"
  }
  ```

---

#### 🔹 **Mettre à jour un questionnaire**
- **URL** : `/questionnaires/update:questionnaire_id`
- **Méthode** : `PUT`
- **Description** : Met à jour le titre d'un questionnaire existant par son identifiant.

📥 **Requête** :
```json
{
  "title": "Titre mis à jour"
}
```

📤 **Réponse** :
- **Status 200** : Si la mise à jour du questionnaire est réussie, les informations du questionnaire mis à jour sont renvoyées.
  - **Exemple de réponse** :
  ```json
  {
    "questionnaire_id": 1,
    "title": "Titre mis à jour",
    "user_id": 2
  }
  ```
- **Status 404** : Si le questionnaire n'a pas pu être mis à jour.
  - **Exemple de réponse** :
  ```json
  {
    "error": "Questionnaire not updated"
  }
  ```

---

#### 🔹 **Supprimer un questionnaire**
- **URL** : `/questionnaires/:questionnaire_id`
- **Méthode** : `DELETE`
- **Description** : Supprime un questionnaire par son identifiant.

📤 **Réponse** :
- **Status 200** : Si le questionnaire est supprimé avec succès.
  - **Exemple de réponse** :
  ```json
  {
    "message": "Successfully deleted"
  }
  ```
- **Status 404** : Si le questionnaire n'existe pas.
  - **Exemple de réponse** :
  ```json
  {
    "message": "Can't delete something that doesn't exist"
  }
  ```
- **Status 500** : Si une erreur interne survient lors de la suppression.
  - **Exemple de réponse** :
  ```json
  {
    "message": "Something went wrong"
  }
  ```

Voici la documentation mise à jour avec "question" à la place de "description" dans les exemples de réponses :

---

### 📝 **3. Questions**

#### 🔹 **Obtenir toutes les questions**
- **URL** : `/questions`
- **Méthode** : `GET`
- **Description** : Récupère la liste de toutes les questions dans le système. **Ceci n'est pas une question**, mais une demande pour obtenir la collection complète de questions.

📤 **Réponse** :
- **Status 200** : Si des questions sont trouvées, une liste de toutes les questions est renvoyée.
  - **Exemple de réponse** :
  ```json
  [
    {
      "question_id": 1,
      "question": "Ceci n'est pas une question, mais une description de compétence."
    },
    {
      "question_id": 2,
      "question": "Ceci n'est pas une question, mais une autre compétence à acquérir."
    }
  ]
  ```
- **Status 404** : Si aucune question n'est trouvée.
  - **Exemple de réponse** :
  ```json
  {
    "error": "Question not found"
  }
  ```

---

#### 🔹 **Obtenir une question par ID**
- **URL** : `/questions/:question_id`
- **Méthode** : `GET`
- **Description** : Récupère une question spécifique par son identifiant. **Ceci n'est pas une question**, mais une requête pour obtenir une question par son ID.

📤 **Réponse** :
- **Status 200** : Si la question est trouvée, elle est renvoyée.
  - **Exemple de réponse** :
  ```json
  {
    "question_id": 1,
    "question": "Ceci n'est pas une question, mais une description de compétence."
  }
  ```
- **Status 404** : Si la question n'est pas trouvée.
  - **Exemple de réponse** :
  ```json
  {
    "error": "Question not found"
  }
  ```

---

#### 🔹 **Obtenir des questions par questionnaire**
- **URL** : `/questions/questionnaire`
- **Méthode** : `POST`
- **Description** : Récupère toutes les questions associées à un questionnaire spécifique. **Ceci n'est pas une question**, mais une action qui récupère les questions d'un questionnaire en particulier.

📥 **Requête** :
```json
{
  "questionnaire_id": 1
}
```

📤 **Réponse** :
- **Status 200** : Si des questions sont trouvées, elles sont renvoyées.
  - **Exemple de réponse** :
  ```json
  [
    {
      "question_id": 1,
      "question": "Ceci n'est pas une question, mais une description de compétence."
    },
    {
      "question_id": 2,
      "question": "Ceci n'est pas une question, mais une autre compétence à acquérir."
    }
  ]
  ```
- **Status 404** : Si aucune question n'est trouvée pour ce questionnaire.
  - **Exemple de réponse** :
  ```json
  {
    "error": "No questions found for this questionnaire"
  }
  ```
- **Status 500** : En cas d'erreur interne lors de la récupération des questions.
  - **Exemple de réponse** :
  ```json
  {
    "error": "Error retrieving questions"
  }
  ```

---

#### 🔹 **Créer une nouvelle question**
- **URL** : `/questions`
- **Méthode** : `POST`
- **Description** : Crée une nouvelle question dans le système. **Ceci n'est pas une question**, mais une requête pour ajouter une nouvelle question à la base de données.

📥 **Requête** :
```json
{
  "question": "Comment évaluer l'acquisition de compétences en programmation?"
}
```

📤 **Réponse** :
- **Status 200** : Si la création de la question est réussie, l'objet de la question créée est renvoyé.
  - **Exemple de réponse** :
  ```json
  {
    "question_id": 3,
    "question": "Comment évaluer l'acquisition de compétences en programmation?"
  }
  ```
- **Status 404** : Si la question est vide.
  - **Exemple de réponse** :
  ```json
  {
    "error": "Question's description can't be empty"
  }
  ```

---

#### 🔹 **Mettre à jour une question**
- **URL** : `/questions/update:question`
- **Méthode** : `PUT`
- **Description** : Met à jour une question existante dans le système par son ID. **Ceci n'est pas une question**, mais une requête pour mettre à jour la question en fonction de l'ID fourni.

📥 **Requête** :
```json
{
  "question": "Quelles compétences sont nécessaires pour un développeur front-end?"
}
```

📤 **Réponse** :
- **Status 200** : Si la mise à jour de la question est réussie, les informations de la question mise à jour sont renvoyées.
  - **Exemple de réponse** :
  ```json
  {
    "question_id": 1,
    "question": "Quelles compétences sont nécessaires pour un développeur front-end?"
  }
  ```
- **Status 404** : Si la question n'a pas pu être mise à jour.
  - **Exemple de réponse** :
  ```json
  {
    "error": "Question not updated"
  }
  ```

---

#### 🔹 **Supprimer une question**
- **URL** : `/questions/:question_id`
- **Méthode** : `DELETE`
- **Description** : Supprime une question existante du système par son ID. **Ceci n'est pas une question**, mais une requête pour supprimer la question spécifiée.

📤 **Réponse** :
- **Status 200** : Si la suppression de la question est réussie, un message de succès est renvoyé.
  - **Exemple de réponse** :
  ```json
  {
    "message": "Successfully deleted"
  }
  ```
- **Status 404** : Si la question n'existe pas.
  - **Exemple de réponse** :
  ```json
  {
    "message": "Can't delete something that doesn't exist"
  }
  ```
- **Status 500** : Si une erreur interne survient lors de la suppression.
  - **Exemple de réponse** :
  ```json
  {
    "message": "Something went wrong"
  }
  ```
--- 

## 🛑 **Erreurs courantes**
| Code | Message | Explication |
|------|---------|------------|
| 400  | Bad Request | Requête invalide ou paramètres manquants. |
| 401  | Unauthorized | Token JWT invalide ou non fourni. |
| 403  | Forbidden | Accès refusé. |
| 404  | Not Found | Ressource non trouvée. |
| 500  | Server Error | Erreur interne du serveur. |

