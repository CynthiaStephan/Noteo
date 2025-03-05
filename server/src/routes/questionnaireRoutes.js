const QuestionnaireController = require('../controllers/questionnaireControllers')
const { Router } = require('express');

const router = Router();

router.get('/', QuestionnaireController.getAllQuestionnaires);
router.get('/:questionnaire_id', QuestionnaireController.getQuestionnaireById);
router.post('/:user_id', QuestionnaireController.createQuestionnaire);
router.delete('/:questionnaire_id', QuestionnaireController.deleteQuestionnaire);
router.put('/update/:questionnaire_id', QuestionnaireController.updateQuestionnaire);



module.exports = router;