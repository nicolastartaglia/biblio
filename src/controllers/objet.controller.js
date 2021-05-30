const objet = require("../models").objet;
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
                                Sequelize.fn('lower', Sequelize.col('Nom')), 
                                {
                                    [Op.like]: '%'+req.body.Nom.toLowerCase()+'%'
                                }
                            ),
                            Sequelize.where(
                                Sequelize.fn('lower', Sequelize.col('Prenom')), 
                                {
                                    [Op.like]: '%'+req.body.Prenom.toLowerCase()+'%'
                                }
                            ),
                            Sequelize.where(
                                Sequelize.fn('lower', Sequelize.col('Email')), 
                                {
                                    [Op.like]: '%'+req.body.Email.toLowerCase()+'%'
                                }
                            ),
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
                    TypeObjet: req.body.TypeObjet,
                    empruntId: req.body.empruntId,
                    CreePar: req.body.CreePar,
                    MisAJourPar: req.body.MisAJourPar
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
                TypeObjet: req.body.TypeObjet,
                empruntId: req.body.empruntId,
                CreePar: req.body.CreePar,
                MisAJourPar: req.body.MisAJourPar
            });
            res.status(201).json(unNouvelObjet);
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }

}