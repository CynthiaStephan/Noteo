const { Router } = require('express');
const trainingController = require('../controllers/trainingController');

const router = Router();

// Récuperer les formations
// Admin / Formateur
router.get('/', trainingController.getTrainings);

// Récuperer une formation
// Admin / Formateur
router.get('/:training_id', trainingController.getTrainingById);

// Créer une formation
// Admin
router.post('/new', trainingController.createTraining);

// Modifier une formation
// Admin
router.put('/:training_id', trainingController.updateTraining);

// Supprimer une formation
// Admin
router.delete('/:training_id', trainingController.deleteTraining);

module.exports = router;