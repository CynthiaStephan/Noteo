const TrainingModel = require('../models/trainingModel');

class TrainingController {
    async getTrainingById(req, res) {
        const { training_id } = req.params;

        try {
            const training = await TrainingModel.findByPk(training_id);
            if (!training || training.length === 0) {
                return res.status(404).json({error: "Aucune formation trouvée"});
            }
            res.status(200).json(training);
        } catch (error) {
            res.status(500).json({error: error.message});
        };
    };
    async getTrainings(req, res) {
        try {
            const [trainings] = await TrainingModel.findAll();
            if (!trainings || trainings.length === 0) {
                return res.status(404).json({message: "Aucune formation trouvée"});
            }
            res.status(200).json(trainings);
        } catch (error) {
            res.status(500).json({error: error.message});
        };
    };
    async createTraining(req, res) {
        const { name } = req.body;

        try {
            const newTraining = await TrainingModel.create({
                name: name
            });
            res.status(200).json({newTraining});
        } catch (error) {
            res.status(500).json({error: error.message});
        };
    };
    async updateTraining(req, res) {
        const { training_id } = req.params;
        const { name } = req.body;
        try {
            const updatedData = {};
            if (name) updatedData.name = name;
            const [newTraining] = await TrainingModel.update(updatedData, { where: {training_id: training_id} });

            if (newTraining === 0) {
                return res.status(404).json({message: "Aucune formation trouvée"});
            }
            res.status(200).json({message: "Formation mis à jour"});
        } catch (error) {
            res.status(500).json({error: error.message});
        };
    };
    async deleteTraining(req, res) {
        const { training_id } = req.params;

        try {
            const deletedTraining = await TrainingModel.destroy({where: {training_id: training_id}});
            if (deletedTraining === 0) {
                return res.status(404).json({message: "Aucune formation trouvée"});
            }
            res.status(200).json({message: "Formation supprimée"});
        } catch (error) {
            res.status(500).json({error: error.message});
        };
    };
};

module.exports = new TrainingController();