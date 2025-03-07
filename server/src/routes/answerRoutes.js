const { Router } = require('express');
const AnswerController = require('../controllers/answerControllers');

const router = Router();

router.get('/', AnswerController.getAllAnswers);
router.get('/:answer_id', AnswerController.getAnswerById);
router.post('/new/:question_id', AnswerController.createAnswer);
router.delete('/:answer_id', AnswerController.deleteAnswer);
router.put('/update/:answer_id', AnswerController.updateAnswer);
router.get('/questionnaire_id', AnswerController.getAnwserByUserByQuestionnaires);

module.exports = router;