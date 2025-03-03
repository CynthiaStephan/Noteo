const QuestionnaireController = require('../controllers/questionnaireControllers')
const { Router } = require('express');

const router = Router();

router.get('/', QuestionnaireController.getAllQuestionnaires);
router.get('/:questionnaire_id', QuestionnaireController.getQuestionnaireById);
router.post('/', QuestionnaireController.createQuestionnaire);
router.delete('/:questionnaire_id', QuestionnaireController.deleteQuestionnaire);

module.exports = router