const abonne = require("../models").abonne;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async obtenirQuelquesAbonnes(req, res) {
        try {
            console.log(req.body);
            const cond1 = (req.body.Email === '') ? "$ne: ''" : "$ilike: '%'+req.body.Email+'%'" ;
            const cond2 = (req.body.Nom === '') ? "$ne: ''" : "$ilike: '%'+req.body.Nom+'%'";
            const cond3 = (req.body.Prenom === '') ? "$ne: ''" : "$ilike: '%'+req.body.Prenom+'%'";
            const conditionDeRecherche = "{where: { Email: { "+cond1+"}, Nom: {"+cond2+"}, Prenom: {"+cond3*"}}}";
            console.log(cond1, cond2, cond3);
            // const collectionDAbonne = await abonne.findAll(conditionDeRecherche);
            const collectionDAbonne = await abonne.findAll({
            //     where: { 
                       
            //             Nom: {
            //                 [Op.like]: '%Bob%'
            //             }
                       
            //          }
            // });

                where: { 
               
                    Nom: {
                        [Op.iLike]: '%'+req.body.Nom+'%'
                    }
                    
                  
                 }
            });
        
            if (collectionDAbonne) {
                res.status(201).json(collectionDAbonne);
            }
            else {
                res.status(200).json({ "message": "Pas d'abonné" })
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async obtenirUnAbonne(req, res) {
        try {
            const unAbonne = await abonne.findOne({
                where: { id: req.params.abonneId }
            });
            if (unAbonne) {
                res.status(201).json(unAbonne);
            }
            else {
                res.status(200).json({ "message": "Ce numéro d'abonné n'existe pas!" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async mettreAJourUnAbonne(req, res) {
        try {
            const abonneAMettreAJour = await abonne.findOne({
                where: { id: req.params.abonneId }
            });
            if (abonneAMettreAJour) {

                const abonneMisAJour = await abonneAMettreAJour.update({
                    Nom: req.body.Nom,
                    Prenom: req.body.Prenom,
                    Email: req.body.Email,
                    Rue: req.body.Rue,
                    CodePostal: req.body.CodePostal,
                    Ville: req.body.Ville,
                    DateLimiteAbonnement: new Date(req.body.DateLimiteAbonnement),
                    Amende: parseFloat(req.body.Amende),
                    PenaliteNbJours: parseInt(req.body.PenaliteNbJours),
                    CreePar: parseInt(req.body.CreePar),
                    MisAJourPar: parseInt(req.body.MisAJourPar)
                });
                res.status(201).json(abonneMisAJour);

            }
            else {
                res.status(200).json({ "message": "abonne inconnu" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async supprimerUnAbonne(req, res) {
        try {
            const abonneASupprimer = await abonne.findOne(({
                where: { id: req.params.abonneId }
            }))
            if (abonneASupprimer) {
                abonneASupprimer.destroy();
                res.status(201).json({ "message": "Cet abonné a été supprimé" });
            }
            else {
                res.status(200).json({ "message": "abonné inconnu" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async ajouterUnAbonne(req, res) {
        try {
            const unNouvelAbonne = await abonne.create({
                Nom: req.body.Nom,
                Prenom: req.body.Prenom,
                Email: req.body.Email,
                Rue: req.body.Rue,
                CodePostal: req.body.CodePostal,
                Ville: req.body.Ville,
                DateLimiteAbonnement: new Date(req.body.DateLimiteAbonnement),
                Amende: req.body.Amende,
                PenaliteNbJours: req.body.PenaliteNbJours,
                CreePar: req.body.CreePar,
                MisAJourPar: req.body.MisAJourPar
            });
            res.status(201).json(unNouvelAbonne);
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }

}