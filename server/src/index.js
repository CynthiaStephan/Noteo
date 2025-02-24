require('dotenv').config();
const app = require('./app');
const sequelize = require('./database');

// Models import
// const User = require('./models/userModel');
// const Blacklist = require('./models/blacklistModel');
// const Cohort = require('./models/cohortModel');
// const CohortUser = require('./models/cohortUserModel');
// const MoodScore = require('./models/moodScoreModel');

// const models = { User, Blacklist, Cohort, CohortUser, MoodScore };

// Object.values(models).forEach((model) => {
//     if (model.associate) {
//         model.associate(models);
//     }
// });


(async () => {
  try {
      await sequelize.authenticate(); 
      console.log('Connexion à la base de données réussie.');
      // # Pass to true to init the db
      await sequelize.sync({ force: false });
      console.log('La base de données et les modèles sont synchronisés.');
  } catch (error) {
      console.error('Erreur lors de la synchronisation :', error);
  } 
})();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});