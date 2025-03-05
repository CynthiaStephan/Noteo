const QuestionController = require('../controllers/questionControllers')
const { Router } = require('express');

const router = Router();

router.get('/', QuestionController.getAllQuestions);
router.get('/:question_id', QuestionController.getQuestionById);
router.post('/', QuestionController.createQuestion);
router.delete('/:question_id', QuestionController.deleteQuestion);
router.put('update/:question_id', QuestionController.updateQuestion);

module.exports = router;