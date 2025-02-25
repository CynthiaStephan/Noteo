# Règles de Contribution

Pour contribuer au projet, que ce soit pour ajouter une nouvelle fonctionnalité, corriger un bug ou améliorer les tests, suivez les étapes ci-dessous :



## 1. **Créer une nouvelle branche**
Avant de commencer à travailler sur une tâche, créez une branche dédiée pour vos modifications.  
Utilisez la commande suivante :  
```bash
git switch -c type_branche/nom_branche
```

- **type_branche** :
  - `features` : pour une nouvelle fonctionnalité.
  - `bugs` : pour corriger un bug.
  - `refactor` : pour restructurer ou améliorer le code sans changer son comportement.
  - `docs` : pour mettre à jour ou améliorer la documentation.
  - `tests` : pour ajouter ou améliorer des tests.
  - `chore` : pour des tâches de maintenance ou des modifications sans impact sur le code (par exemple, mise à jour de dépendances).

- **nom_branche** : doit décrire clairement ce que vous faites.
  - Exemples : `features/page-login`, `bugs/correction-modal`, `tests/update-auth-tests`, `refactor/clean-auth-service` .


## 2. **Travailler sur la branche**
- Codez normalement et effectuez des commits régulièrement pour enregistrer vos modifications localement.
- Utilisez des messages de commit clairs et explicites, comme :  
  ```bash
  git commit -m "Ajout de la page de connexion"
  ```


## 3. **Pousser les modifications**
- Lorsque vous êtes prêt à partager votre travail, poussez vos modifications sur le dépôt distant :  
  ```bash
  git push -u origin type_branche/nom_branche
  ```
  Par exemple :  
  ```bash
  git push -u origin features/page-login
  ```

- Une fois la commande exécutée, vous verrez la nouvelle branche apparaître sur le dépôt GitHub.


## 4. **Créer une pull request**
- Une fois vos modifications terminées, ouvrez une pull request sur GitHub :
  - Décrivez les changements effectués et leur objectif.
  - Ajoutez des détails pour faciliter la revue par vos collègues.
- Patientez pour recevoir des commentaires ou une approbation.


## 5. **Ajouter des commits à une pull request existante**
- Si vous devez apporter d'autres modifications pendant que la pull request est en attente :
  - Faites vos changements sur la même branche.
  - Effectuez des commits et poussez-les comme précédemment.
  - Les nouveaux commits seront automatiquement ajoutés à la pull request.