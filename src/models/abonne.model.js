module.exports = (sequelize, Sequelize) => {
    const abonne  = sequelize.define('abonne', {
        Nom: {
            type: Sequelize.STRING
        },
        Prenom: {
            type: Sequelize.STRING
        },
        Email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        Rue: {
            type: Sequelize.STRING
        },
        CodePostal: {
            type: Sequelize.STRING
        },
        Ville: {
            type: Sequelize.STRING
        },
        DateLimiteAbonnement: {
            type: Sequelize.DATE
        },
        Amende: {
            type: Sequelize.FLOAT
        },
        PenaliteNbJours: {
            type: Sequelize.INTEGER
        },
        CreePar: {
            type: Sequelize.INTEGER
        },
        MisAJourPar: {
            type: Sequelize.INTEGER
        }
    });
    return abonne;
}