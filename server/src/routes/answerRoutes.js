const { Router } = require('express');
const AnswerController = require('../controllers/answerControllers');
const answerControllers = require('../controllers/answerControllers');

const router = Router();

router.get('/', AnswerController.getAllAnswers);
router.get('/results/:questionnaire_id/:user_id', AnswerController.getAnwserByUserByQuestionnaires);
router.get('/:answer_id', AnswerController.getAnswerById);
router.post('/new/questionnaire', AnswerController.createManyAnswers);
router.post('/new/:question_id', AnswerController.createAnswer);
router.delete('/:answer_id', AnswerController.deleteAnswer);
router.put('/update/:answer_id', AnswerController.updateAnswer);

module.exports = router;