const dbConfig = require("../config/db.config");

const Sequelize = require("sequelize");

// Initialisation d'une nouvelle instance de connexion à mysql avec les parametres recuperes du module db.config.js
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

// Mise en place de la connexion
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// liste des tables utilisées
db.objet = require('../models/objet.model')(sequelize, Sequelize);
db.bibliothecaire = require('../models/bibliothecaire.model')(sequelize, Sequelize);
db.emprunt = require('../models/emprunt.model')(sequelize, Sequelize);
db.commentaire = require('../models/commentaire.model')(sequelize, Sequelize);
db.abonne = require('../models/abonne.model')(sequelize, Sequelize);


// sequelize créé une clé étrangère dont le nom est préformaté à partir d'une table avec sa clé primaire
// ici on crée la clé étrangère empruntId dans la table objets associé à la clé primaire de la table emprunt
// cette instruction a le même effet qu'en utilisant belongsToMany en partant de la clé étrangère dont on aurait personnalisé le nom
db.emprunt.hasMany(db.objet); // empruntId ajouté à la table objets
db.abonne.hasMany(db.emprunt); // abonneId ajouté à la table emprunts
db.objet.hasMany(db.commentaire); // objetId ajouté à la table commentaires

// on part de clés étrangères dont le nom est personnalisé pour les associer à une table avec sa clé primaire
db.objet.belongsTo(db.bibliothecaire, {
    foreignKey: "CreePar"
});
db.objet.belongsTo(db.bibliothecaire, {
    foreignKey: "MisAJourPar"
});
db.objet.belongsTo(db.abonne, {
    foreignKey: "ReservePar"
});

db.emprunt.belongsTo(db.bibliothecaire, {
    foreignKey: "EmpruntEnregistrePar"
});
db.emprunt.belongsTo(db.bibliothecaire, {
    foreignKey: "RetourEnregistrePar"
});

db.abonne.belongsTo(db.bibliothecaire, {
    foreignKey: "CreePar"
});
db.abonne.belongsTo(db.bibliothecaire, {
    foreignKey: "MisAJourPar"
});

db.commentaire.belongsTo(db.bibliothecaire, {
    foreignKey: "PrisEnChargePar"
});



module.exports = db;