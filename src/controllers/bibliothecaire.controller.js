const bibliothecaire = require("../models").bibliothecaire;
const bcrypt = require("bcryptjs");


module.exports = {
    async obtenirTousLesBibliothecaires(req, res) {
        try {
            const collectionDeBibliothecaires = await bibliothecaire.findAll({});
            if (collectionDeBibliothecaires) {
                res.status(201).json(collectionDeBibliothecaires);
            }
            else {
                res.status(404).json({"message": "Pas de bibliothecaire"})
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async obtenirUnBibliothecaire(req, res) {
        try {
            const unBibliothecaire = await bibliothecaire.findOne({
                where: { id: req.params.bibliothecaireId }
            });
            if (unBibliothecaire) {
                res.status(201).json(unBibliothecaire);
            }
            else {
                res.status(404).json({"message": "bibliothecaire inconnu"});
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async mettreAJourUnBibliothecaire(req, res) {
        try {
            const bibliothecaireAMettreAJour = await bibliothecaire.findOne({
                where: { id: req.params.bibliothecaireId }
            });
            if (bibliothecaireAMettreAJour) {
                if (req.body.Password !== bibliothecaireAMettreAJour.Password && req.body.Password !== ''){
                    const bibliothecaireMisAJour = await bibliothecaireAMettreAJour.update({
                        Nom: req.body.Nom,
                        Prenom: req.body.Prenom,
                        Email: req.body.Email,
                        Password: bcrypt.hashSync(req.body.Password, 8),
                        Referent: req.body.Referent,
                        Statut: req.body.Statut
                    });
                    res.status(201).json(bibliothecaireMisAJour);
                } else {
                    const bibliothecaireMisAJour = await bibliothecaireAMettreAJour.update({
                        Nom: req.body.Nom,
                        Prenom: req.body.Prenom,
                        Email: req.body.Email,
                        Referent: req.body.Referent,
                        Statut: req.body.Statut
                    });
                    res.status(201).json(bibliothecaireMisAJour);
                }
            }
            else {
                res.status(404).json({"message": "bibliothecaire inconnu"});
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async supprimerUnBibliothecaire(req, res) {
        try {
            const bibliothecaireASupprimer = await bibliothecaire.findOne(({
                where: { id: req.params.bibliothecaireId }
            }))
            if (bibliothecaireASupprimer) {
                bibliothecaireASupprimer.destroy();
                res.status(201).json({"message": "bibliothecaire supprimé"});
            }
            else {
                res.status(404).json({"message": "bibliothecaire inconnu"});
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }

}