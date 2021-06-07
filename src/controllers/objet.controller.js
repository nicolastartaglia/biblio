const objet = require("../models").objet;
const emprunt = require("../models").emprunt;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async obtenirQuelquesObjets(req, res) {
        try {
            const collectionDObjet = await objet.findAll(
                { 
                    where: {
                        [Op.and]: [ 
                            Sequelize.where(
                                Sequelize.fn('lower', Sequelize.col('TypeObjet')), 
                                {
                                    [Op.eq]: req.body.TypeObjetRecherche.toLowerCase()
                                }
                            ),
                            { 
                                [Op.or]: [
                                    Sequelize.where(
                                        Sequelize.fn('lower', Sequelize.col('Titre')), 
                                        {
                                            [Op.like]: '%'+req.body.TitreRecherche.toLowerCase()+'%'
                                        }
                                    ),
                                    Sequelize.where(
                                        Sequelize.fn('lower', Sequelize.col('AuteurScenariste')), 
                                        {
                                            [Op.like]: '%'+req.body.AuteurArtisteRecherche.toLowerCase()+'%'
                                        }
                                    ),
                                    Sequelize.where(
                                        Sequelize.fn('lower', Sequelize.col('Realisateur')), 
                                        {
                                            [Op.like]: '%'+req.body.AuteurArtisteRecherche.toLowerCase()+'%'
                                        }
                                    ),
                                    Sequelize.where(
                                        Sequelize.fn('lower', Sequelize.col('Scenariste')), 
                                        {
                                            [Op.like]: '%'+req.body.AuteurArtisteRecherche.toLowerCase()+'%'
                                        }
                                    ),
                                    Sequelize.where(
                                        Sequelize.fn('lower', Sequelize.col('Dessinateur')), 
                                        {
                                            [Op.like]: '%'+req.body.AuteurArtisteRecherche.toLowerCase()+'%'
                                        }
                                    ),
                                    Sequelize.where(
                                        Sequelize.fn('lower', Sequelize.col('Artiste')), 
                                        {
                                            [Op.like]: '%'+req.body.AuteurArtisteRecherche.toLowerCase()+'%'
                                        }
                                    )
                                ]
                            }
                        ]
                    }
                }
            );
        
            if (collectionDObjet) {
                res.status(201).json(collectionDObjet);
            }
            else {
                res.status(200).json({ "message": "Pas d'objet" })
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async obtenirUnObjet(req, res) {
        try {
            const unObjet = await objet.findOne({
                where: { id: req.params.objetId }
            });
            if (unObjet) {
                res.status(201).json(unObjet);
            }
            else {
                res.status(200).json({ "message": "Ce numéro d'objet n'existe pas!" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async obtenirUnObjetAEmprunter(req, res) {
        try {
            const unObjet = await objet.findOne({
                where: { id: req.body.objetId }
            });
            if (unObjet) {
                if(unObjet.empruntId == 1){
                    if(unObjet.reservePar != 1){
                        if(Math.ceil((new Date() - unObjet.DateReservation) / (1000 * 60 * 60 * 24)) > parserInt(req.body.dureeReservation)) {
                            res.status(201).json(unObjet);
                        } else {
                            res.status(200).json({ "message": "Cet objet a été réservé" });
                        }
                    }
                } else {
                    res.status(200).json({ "message": "Cet objet a été emprunté" });
                }
            }
            else {
                res.status(200).json({ "message": "Ce numéro d'objet n'existe pas!" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async mettreAJourUnObjet(req, res) {
        try {
            const objetAMettreAJour = await objet.findOne({
                where: { id: req.params.objetId }
            });
            if (objetAMettreAJour) {
                const objetMisAJour = await objetAMettreAJour.update({
                    Titre: req.body.Titre,
                    AuteurScenariste: req.body.AuteurScenariste,
                    Realisateur: req.body.Realisateur,
                    Scenariste: req.body.Scenariste,
                    Genre: req.body.Genre,
                    Annee: req.body.Annee,
                    Duree: parseInt(req.body.Duree),
                    Description: req.body.Description,
                    Edition: req.body.Edition,
                    Pages: parseInt(req.body.Pages),
                    Dessinateur: req.body.Dessinateur,
                    Artiste: req.body.Artiste,
                    Zone: req.body.Zone,
                    Travee: req.body.Travee,
                    EtagereBac:req.body.EtagereBac,
                    Code3C: req.body.Code3C,
                    Etat: req.body.Etat,
                    Reserve: req.body.Reserve,
                    DateReservation: new Date(req.body.DateReservation),
                    TypeObjet: req.body.TypeObjet,
                    empruntId: parseInt(req.body.empruntId),
                    reservePar: parseInt(req.body.reservePar),
                    CreePar: parseInt(req.body.CreePar),
                    MisAJourPar: parseInt(req.body.MisAJourPar)
                });
                res.status(201).json(objetMisAJour);

            }
            else {
                res.status(200).json({ "message": "objet inconnu" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async supprimerUnObjet(req, res) {
        try {
            const objetASupprimer = await objet.findOne(({
                where: { id: req.params.objetId }
            }))
            if (objetASupprimer) {
                objetASupprimer.destroy();
                res.status(201).json({ "message": "Cet objet a été supprimé" });
            }
            else {
                res.status(200).json({ "message": "objet inconnu" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async ajouterUnObjet(req, res) {
        try {
            console.log("ajout");
            const unNouvelObjet = await objet.create({
                Titre: req.body.Titre,
                AuteurScenariste: req.body.AuteurScenariste,
                Realisateur: req.body.Realisateur,
                Scenariste: req.body.Scenariste,
                Genre: req.body.Genre,
                Annee: req.body.Annee,
                Duree: parseInt(req.body.Duree),
                Description: req.body.Description,
                Edition: req.body.Edition,
                Pages: parseInt(req.body.Pages),
                Dessinateur: req.body.Dessinateur,
                Artiste: req.body.Artiste,
                Zone: req.body.Zone,
                Travee: req.body.Travee,
                EtagereBac:req.body.EtagereBac,
                Code3C: req.body.Code3C,
                Etat: req.body.Etat,
                Reserve: req.body.Reserve,
                DateReservation: new Date(req.body.DateReservation),
                TypeObjet: req.body.TypeObjet,
                empruntId: parseInt(req.body.empruntId),
                reservePar: parseInt(req.body.reservePar),
                CreePar: parseInt(req.body.CreePar),
                MisAJourPar: parseInt(req.body.MisAJourPar)
            });
            res.status(201).json(unNouvelObjet);
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }
    
}