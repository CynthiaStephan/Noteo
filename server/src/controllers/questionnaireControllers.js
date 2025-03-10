const QuestionnaireModel = require('../models/questionnaireModel');
const QuestionModel = require('../models/questionModel');
const UserModel = require('../models/userModel');

class QuestionnaireController{

    async getAllQuestionnaires(req, res){
        try {
            console.log(QuestionModel.getTableName);
            console.log(UserModel.getTableName);

            const questionnaire = await QuestionnaireModel.findAll();
            if(!questionnaire || questionnaire.length === 0){
                return res.status(404).json({ error : 'Questionnaire not found'});
            }
            res.status(200).json(questionnaire);
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    };

    async getQuestionnaireById(req, res){

        const { questionnaire_id } = req.params;
        try{

            const questionnaire = await QuestionnaireModel.findByPk(questionnaire_id,{
                include: [{
                    model: QuestionModel,
                    through: { attributes: [] },
                }]
            });

            if(!questionnaire || questionnaire.length === 0){
                return res.status(404).json({ error: 'Questionnaire not found'});
            }
            
            res.status(200).json(questionnaire);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createQuestionnaire(req, res){
        const { trainer_id } = req.params;
        const { title, question_ids, user_ids } = req.body;

        try {
            if(title.length === 0){
                return res.status(404).json({ error: `Questionnaire's title can't be empty`});
            }

            const newQuestionnaire = await QuestionnaireModel.create({
                title : title,
                user_id : trainer_id,
            });

            if (!newQuestionnaire){
                return res.status(404).json({ message: `Fail while creating the questionnaire`});
            }
            
            if (Array.isArray(question_ids) && question_ids.length > 0) {
                await newQuestionnaire.addQuestions(question_ids);
            }
    
            if (Array.isArray(user_ids) && user_ids.length > 0) {
                await newQuestionnaire.addAssigned_users(user_ids);
            }
    
            const fullQuestionnaire = await QuestionnaireModel.findByPk(newQuestionnaire.questionnaire_id, {
                include: [
                    {
                        model: QuestionModel,
                        attributes: ["question_id", "question"],
                        through: { 
                            attributes: []
                        }
                    },
                    {
                        model: UserModel,
                        as: "assigned_users",
                        attributes: ["user_id", "first_name", "last_name"],
                        through: { 
                            attributes: []
                        }
                    }
                ]
            });
    
            res.status(201).json(fullQuestionnaire);
            
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    };

    async updateQuestionnaire(req, res){
        const { questionnaire_id } = req.params;
        const { title } = req.body;
        try{
            const updatedQuestionnaire = await QuestionnaireModel.update({title:title},{ where: {questionnaire_id: questionnaire_id} });

            if(updatedQuestionnaire === 0){
                return res.status(404).json({ error : 'Questionnaire not updated'});
            }
            res.status(200).json(updatedQuestionnaire)
        } catch (error) {
            res.status(500).json({ error : error.message });
        }
    };

    async deleteQuestionnaire(req, res){
        const { questionnaire_id} = req.params;

        try {
            const questionnaireToDelete = await QuestionnaireModel.findByPk(questionnaire_id);
            console.log("Questionnaire to delete : " + questionnaireToDelete);

            // Verify that we don't delete something that doesn't exist
            if(!questionnaireToDelete || questionnaireToDelete.length === 0){
                return res.status(404).json({ message: `Can't delete something that doesn't exist`})
            }
            // Deleting the questionnaire
            const toDelete = await QuestionnaireModel.destroy({
                where: {
                    questionnaire_id: questionnaire_id,
                },
            });
            // After depletion, check if it's really gone
            const isItReallyGone = await QuestionnaireModel.findByPk(questionnaire_id);
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

module.exports = new QuestionnaireController