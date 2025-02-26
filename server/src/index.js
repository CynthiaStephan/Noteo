require('dotenv').config();
const app = require('./app');
const sequelize = require('./database');

// Models import
const User = require('./models/userModel');
const Questionnaire = require('./models/questionnaireModel');
const Question = require('./models/questionModel');
const Answer = require('./models/answerModel');

const models = {
    user: User,
    questionnaire: Questionnaire,
    question: Question,
    answer: Answer
};

Object.values(models).forEach((model) => {
    if (model.associate) {
        model.associate(models);
    }
});


(async () => {
  try {
      await sequelize.authenticate(); 
      console.log('Connexion à la base de données réussie.');
      // # Pass to true to init the db
      await sequelize.sync({ force: true });
      console.log('La base de données et les modèles sont synchronisés.');
  } catch (error) {
      console.error('Erreur lors de la synchronisation :', error);
  } 
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});