const QuestionModel = require('../models/questionModel');
const QuestionnaireModel = require('../models/questionnaireModel');

class QuestionController{
    async getAllQuestions(req, res){
            try {
                const question = await QuestionModel.findAll();
                if(!question || question.length === 0){
                    return res.status(404).json({ error : 'Question not found'});
                }
                res.status(200).json(question);
            } catch (error) {
                res.status(500).json({ error : error.message });
            }
        };
    
        async getQuestionById(req, res){
    
            const { question_id } = req.params;
    
            try{
    
                const question = await QuestionModel.findByPk(question_id);
    
                if(!question || question.length === 0){
                    return res.status(404).json({ error: 'Question not found'});
                }
                
                res.status(200).json(question);
    
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        };

        async getQuestionByQuestionnaire(req, res){
            
            const { questionnaire_id } = req.body;
            try {
                const questions = await QuestionnaireModel.findOne({
                    where: {
                        questionnaire_id : questionnaire_id
                    },
                    include: {

                        model: QuestionModel,
                        through:{
                            attributes:[],
                        },
                    }
                });
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    
        async createQuestion(req, res){
            const { description } = req.body;
    
            try {
                if(description.length === 0){
                    return res.status(404).json({ error: `Question's description can't be empty`});
                }
    
                const newQuestion = await QuestionModel.create({
                    description : description,
                });
    
                if (!newQuestion || newQuestion.length === 0){
                    return res.status(404).json({ message: `Fail while creating the question`});
                }
                
                res.status(200).json(newQuestion);
                
            } catch (error) {
                res.status(500).json({ error : error.message });
            }
        };
    
        async updateQuestion(req, res){
            const { question_id } = req.params;
            const { description } = req.body;
            try{
                const updatedQuestion = await QuestionModel.update({description:description},{ where: {question_id: question_id} });
    
                if(updatedQuestion === 0){
                    return res.status(404).json({ error : 'Question not updated'});
                }
                res.status(200).json(updatedQuestion)
            } catch (error) {
                res.status(500).json({ error : error.message });
            }
        };
    
        async deleteQuestion(req, res){
            const { question_id} = req.params;
    
            try {
                const questionToDelete = await QuestionModel.findByPk(question_id);
                console.log("Question to delete : " + questionToDelete);
    
                // Verify that we don't delete something that doesn't exist
                if(!questionToDelete || questionToDelete.length === 0){
                    return res.status(404).json({ message: `Can't delete something that doesn't exist`})
                }
                // Deleting the question
                const toDelete = await QuestionModel.destroy({
                    where: {
                        question_id: question_id,
                    },
                });
                // After depletion, check if it's really gone
                const isItReallyGone = await QuestionModel.findByPk(question_id);
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

module.exports = new QuestionController;