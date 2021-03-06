module.exports = (sequelize, Sequelize) => {
    const objet  = sequelize.define('objet', {
        Titre :{
            type: Sequelize.STRING
        },
        AuteurScenariste :{
            type: Sequelize.STRING
        },
        Realisateur :{
            type: Sequelize.STRING
        },
        Scenariste :{
            type: Sequelize.STRING
        },
        Genre :{
            type: Sequelize.STRING
        },
        Annee :{
            type: Sequelize.STRING
        },
        Duree :{
            type: Sequelize.INTEGER
        },
        Description :{
            type: Sequelize.STRING
        },
        Edition :{
            type: Sequelize.STRING
        },
        Pages :{
            type: Sequelize.INTEGER
        },
        Dessinateur :{
            type: Sequelize.STRING
        },
        Artiste :{
            type: Sequelize.STRING
        },
        Zone :{
            type: Sequelize.STRING
        },
        Travee :{
            type: Sequelize.STRING
        },
        EtagereBac :{
            type: Sequelize.STRING
        },
        Code3c :{
            type: Sequelize.STRING
        },
        Etat :{
            type: Sequelize.STRING
        },
        Reserve :{
            type: Sequelize.STRING
        },
        TypeObjet :{
            type: Sequelize.STRING
        }
    });
    return objet;
}