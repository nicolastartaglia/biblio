const abonne = require("../models").abonne;

module.exports = {
    async obtenirTousLesAbonnes(req, res) {
        try {
            const collectionDAbonne = await abonne.findAll({});
            if (collectionDAbonne) {
                res.status(201).json(collectionDAbonne);
            }
            else {
                res.status(404).json({ "message": "Pas d'abonné" })
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
                res.status(404).json({ "message": "abonné inconnu" });
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
                res.status(404).json({ "message": "abonne inconnu" });
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
                res.status(201).json({ "message": "abonné supprimé" });
            }
            else {
                res.status(404).json({ "message": "abonné inconnu" });
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