const { Router } = require('express');
const userController = require('../controllers/userController');

const router = Router();

// Ajouter un utilisateur
// Admin
router.post('/new', userController.createUser);

// Récupérer un utilisateur spécifique
// Admin / Formation / Utilisateur concerné
router.get('/:user_id', userController.getUserById);

// Récupérer tous les utilisateurs
// Admin
router.get('/', userController.getUsers)

// Mettre à jour un utilisateur
// Admin / Utilisateur concerné
router.put('/:user_id', userController.updateUser);

// Supprimer un utilisateur
// Admin
router.delete('/:user_id', userController.deleteUserById);

module.exports = router;