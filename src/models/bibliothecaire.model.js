module.exports = (sequelize, Sequelize) => {
    const bibliothecaire  = sequelize.define('bibliothecaire', {
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
        Password: {
            type: Sequelize.STRING
        },
        Referent: {
            type: Sequelize.BOOLEAN
        },
        Statut: {
            type: Sequelize.STRING
        }
    });
    return bibliothecaire;
}