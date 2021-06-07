const abonne = require("../models").abonne;
const emprunt = require("../models").emprunt;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async obtenirQuelquesAbonnes(req, res) {
        try {
            const collectionDAbonne = await abonne.findAll(
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
                    DateEmpruntPossible: new Date(req.body.DateEmpruntPossible),
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
                DateEmpruntPossible: new Date(req.body.DateEmpruntPossible),
                CreePar: req.body.CreePar,
                MisAJourPar: req.body.MisAJourPar
            });
            console.log(unNouvelAbonne);
            res.status(201).json(unNouvelAbonne);
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async obtenirLeDernierEmpruntDunAbonne(req, res) {
        try {
            const abonneRecherche = await abonne.findOne({
                    where: { id: req.params.abonneId }
            });
            if (abonneRecherche) {
                const LeDernierEmpruntDUnAbonne = await emprunt.findOne({
                    where: { abonneId: abonneRecherche.id, Statut: "Ouvert" }
                });
                if (LeDernierEmpruntDUnAbonne) {
                    res.status(201).json(LeDernierEmpruntDUnAbonne);
                } else {
                    res.status(201).json({"message": "Pas d'emprunt en cours pour cet abonné"});
                }
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
    async payerLAmende(req, res) {
        try {
            const abonneAMettreAJour = await abonne.findOne({
                where: { id: req.params.abonneId }
            });
            if (abonneAMettreAJour) {
                const abonneMisAJour = await abonneAMettreAJour.update({
                    Amende: 0.0
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
    async renouvelerAbonnement(req, res) {
        try {
            const abonneAMettreAJour = await abonne.findOne({
                where: { id: req.params.abonneId }
            });
            if (abonneAMettreAJour) {
                const abonneMisAJour = await abonneAMettreAJour.update({
                    DateLimiteAbonnement: new Date((new Date()).setDate((new Date()).getDate() + 365))
                  
                });
                console.log(abonneMisAJour);
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
    }

}