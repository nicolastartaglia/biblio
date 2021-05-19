module.exports = (sequelize, Sequelize) => {
    const emprunt  = sequelize.define('emprunt', {
        DateRetourLimite: {
            type: Sequelize.DATE
        },
        Statut: {
            type: Sequelize.STRING
        }
    });
    return emprunt;
}