const bibliothecaire = require("../models").bibliothecaire;

module.exports = {
    async obtenirTousLesBibliothecaires(req, res) {
        try {
            const collectionDeBibliothecaires = await bibliothecaire.findAll({});
            if (collectionDeBibliothecaires) {
                res.status(201).send(collectionDeBibliothecaires);
            }
            else {
                res.status(404).send("Pas de bibliothecaire")
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
                res.status(201).send(unBibliothecaire);
            }
            else {
                res.status(404).send("bibliothecaire inconnu")
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
                const bibliothecaireMisAJour = await bibliothecaireAMettreAJour.update({
                    Nom: req.body.Nom,
                    Prenom: req.body.Prenom,
                    Email: req.body.Email,
                    Password: req.body.Password,
                    Referent: req.body.Referent,
                    Statut: req.body.Statut
                });
                res.status(201).send(bibliothecaireMisAJour);
            }
            else {
                res.status(404).send("bibliothecaire inconnu");
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async supprimerUnBibliothecaire(req, res) {
        try {
            const biblithecaireASupprimer = await bibliothecaire.findOne(({
                where: { id: req.params.bibliothecaireId }
            }))
            if (biblithecaireASupprimer) {
                biblithecaireASupprimer.destroy();
                res.status(201).send("bibliothecaire supprimé");
            }
            else {
                res.status(404).send("bibliothecaire inconnu");
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }

}