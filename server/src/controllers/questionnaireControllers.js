const { where } = require('../database');
const QuestionnaireModel = require('../models/questionnaireModel');

class QuestionnaireController{

    async getAllQuestionnaires(req, res){
        try {
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

            const questionnaire = await QuestionnaireModel.findByPk(questionnaire_id);

            if(!questionnaire || questionnaire.length === 0){
                return res.status(404).json({ error: 'Questionnaire not found'});
            }
            
            res.status(200).json(questionnaire);

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    async createQuestionnaire(req, res){
        const { title } = req.body;

        try {
            if(title.length === 0){
                return res.status(404).json({ error: `Questionnaire's title can't be empty`});
            }

            const newQuestionnaire = await QuestionnaireModel.create({
                title : title,
            });

            if (!newQuestionnaire || newQuestionnaire.length === 0){
                return res.status(404).json({ message: `Fail while creating the questionnaire`});
            }
            
            res.status(200).json(newQuestionnaire);
            
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
    }
}

module.exports = new QuestionnaireController