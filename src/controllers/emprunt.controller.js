const emprunt = require("../models").emprunt;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    async obtenirUnEmprunt(req, res) {
        try {
            const unEmprunt = await emprunt.findOne({
                where: { id: req.params.empruntId }
            });
            if (unEmprunt) {
                res.status(201).json(unEmprunt);
            }
            else {
                res.status(200).json({ "message": "Ce numéro d'emprunt n'existe pas!" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async mettreAJourUnEmprunt(req, res) {
        try {
            const empruntAMettreAJour = await emprunt.findOne({
                where: { id: req.params.empruntId }
            });
            if (empruntAMettreAJour) {
                const empruntMisAJour = await empruntAMettreAJour.update({
                    DateEmprunt: new Date(req.body.DateEmprunt),
                    DateRetour: new Date(req.body.DateRetour),
                    DateRetourLimite: new Date(DateRetourLimite),
                    Statut: req.body.Statut,
                    abonneId: req.body.abonneId,
                    EmpruntEnregistrePar: req.body.EmpruntEnregistrePar,
                    RetourEnregistrePar: req.body.RetourEnregistrePar
                });
                res.status(201).json(empruntMisAJour);

            }
            else {
                res.status(200).json({ "message": "emprunt inconnu" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async ajouterUnEmprunt(req, res) {
        try {
            console.log("ajout");
            const unNouvelEmprunt = await emprunt.create({
                DateEmprunt: new Date(req.body.DateEmprunt),
                DateRetour: new Date(req.body.DateRetour),
                DateRetourLimite: new Date(DateRetourLimite),
                Statut: req.body.Statut,
                abonneId: req.body.abonneId,
                EmpruntEnregistrePar: req.body.EmpruntEnregistrePar,
                RetourEnregistrePar: req.body.RetourEnregistrePar
            });
            res.status(201).json(unNouvelEmprunt);
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }

}