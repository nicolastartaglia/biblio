module.exports = (sequelize, Sequelize) => {
    const emprunt  = sequelize.define('emprunt', {
        DateEmprunt: {
            type: Sequelize.DATE
        },
        DateRetour: {
            type: Sequelize.DATE
        },
        DateRetourLimite: {
            type: Sequelize.DATE
        },
        Statut: {
            type: Sequelize.STRING
        }
    });
    return emprunt;
}