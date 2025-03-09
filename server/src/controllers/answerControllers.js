const AnswerModel = require('../models/answerModel');
const UserModel = require ('../models/userModel');
const QuestionModel = require('../models/questionModel');
const QuestionnaireModel = require('../models/questionnaireModel');
class AnswerController{
    
    async getAllAnswers(req, res){
        try {
            const answer = await AnswerModel.findAll();
            if(!answer || answer.length === 0){
                return res.status(404).json({ error : 'answer not found'});
            }
            res.status(200).json(answer);
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    };
       
    async getAnswerById(req, res){

        const { answer_id } = req.params;

        try{

            const answer = await AnswerModel.findByPk(answer_id);

            if(!answer || answer.length === 0){
                return res.status(404).json({ error: 'answer not found'});
            }
            
            res.status(200).json(answer);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async getAnwserByUserByQuestionnaires(req, res){
        const { questionnaire_id } = req.params;
        const { user_id } = req.body;

        try{
            const questionnaire = await QuestionnaireModel.findByPk(questionnaire_id);
            if (!questionnaire){
                return res.status(404).json({ error: `Questionnaire not found`});
            }
            console.log(questionnaire)
            const user = await UserModel.findByPk(user_id);
            if (!user){
                return res.status(404).json({ error: `User not found`});
            }
            console.log(user)
            
            const userAnswers = await UserModel.findOne({
                where: { user_id: user_id },
                include: [
                    {
                        model: QuestionnaireModel,
                        where: {
                            questionnaire_id: questionnaire_id,
                        },
                        attributes: ['questionnaire_id', 'title'],
                        through: {
                            where: { user_id: user_id },
                            attributes: [],
                        },

                        include: [{
                            model: QuestionModel,
                            attributes: ['question_id', 'question'],
                            through: {
                                attributes: [],
                            },

                            include: [{
                                model: AnswerModel,
                                attributes: ['answer_id', 'answer'],
                                where: { user_id: user_id },
                                through: {
                                    attributes: [],
                                },

                            }],
                        }],
                    },
                ],
            });
            console.log(userAnswers)


            if (!userAnswers) {
                return res.status(404).json({ error: 'No answers found for this user in the given questionnaire' });
            }

            const answers = userAnswers.questionnaires[0].questions.map(question => {
                return {
                    question: question.question,
                    answers: question.answers.map(answer => answer.answer)
                };
            });
    
            res.status(200).json({ questionnaireTitle: questionnaire.title, answers });


        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createAnswer(req, res){
        const { question_id } = req.params;
        const { answer, user_id } = req.body;

        try {
            if(answer.length === 0){
                return res.status(404).json({ error: `answer's answer can't be empty`});
            }
            const question = await QuestionModel.findByPk(question_id);
            if (!question){
                return res.status(404).json({ error: `Question not found`});
            }

            const newanswer = await AnswerModel.create({
                answer : answer,
                user_id : user_id,
            });
            if (!newanswer || newanswer.length === 0){
                return res.status(404).json({ message: `Fail while creating the answer`});
            }

            await newanswer.addQuestion(question);
            res.status(200).json(newanswer);
            
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    };

    async updateAnswer(req, res){
        const { answer_id } = req.params;
        const { answer } = req.body;
        try{
            const updatedanswer = await AnswerModel.update({answer:answer},{ where: {answer_id: answer_id} });

            if(updatedanswer === 0){
                return res.status(404).json({ error : 'answer not updated'});
            }
            res.status(200).json(updatedanswer);
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    };

    async deleteAnswer(req, res){
        const { answer_id} = req.params;

        try {
            const answerToDelete = await AnswerModel.findByPk(answer_id);
            console.log("answer to delete : " + answerToDelete);

            // Verify that we don't delete something that doesn't exist
            if(!answerToDelete || answerToDelete.length === 0){
                return res.status(404).json({ message: `Can't delete something that doesn't exist`});
            }
            // Deleting the answer
            const toDelete = await AnswerModel.destroy({
                where: {
                    answer_id: answer_id,
                },
            });
            // After depletion, check if it's really gone
            const isItReallyGone = await AnswerModel.findByPk(answer_id);
            if (!isItReallyGone){
                res.status(200).json({ message: `Successfully deleted`});
            } 
            else {
                res.status(500).json({ message: `Something went wrong`});
            }

        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    };
}

module.exports = new AnswerController();