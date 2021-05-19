module.exports = (sequelize, Sequelize) => {
    const commentaire  = sequelize.define('commentaire', {
        Contenu: {
            type: Sequelize.TEXT
        },
        Statut: {
            type: Sequelize.STRING
        }
    });
    return commentaire;
}