const commentaire = require("../models").commentaire;

module.exports = {
    async obtenirTousLesCommentairesApprouvesSurUnObjet(req, res) {
        try {
            const collectionDeCommentaires = await commentaire.findAll({
                where: {
                    objetId: req.params.objetId,
                    Statut: "Approuvé"
                }
            });
            if (collectionDeCommentaires) {
                res.status(201).json(collectionDeCommentaires);
            }
            else {
                res.status(404).json({ "message": "Pas de commentaire" })
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async obtenirTousLesCommentairesEnAttente(req, res) {
        try {
            const collectionDeCommentaires = await commentaire.findAll({
                where: {
                    Statut: "EnAttente"
                }
            });
            if (collectionDeCommentaires.length > 0) {
                res.status(201).json(collectionDeCommentaires);
            }
            else {
                res.status(201).json({ "message": "Pas de commentaire à traiter" })
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async supprimerCommentaire(req, res) {
        try {
            const commentaireASupprimer = await commentaire.findOne({
                where: {
                    id: req.params.commentaireId
                }
            });
            if (commentaireASupprimer) {
                commentaireASupprimer.destroy();
                res.status(201).json({ "message": "Commentaire supprimé" });
            }
            else {
                res.status(201).json({ "message": "Commentaire inconnu" })
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    },
    async approuverCommentaire(req, res) {
        try {
            const commentaireAAprouver = await commentaire.findOne({
                where: { id: req.params.commentaireId }
            });
            if (commentaireAAprouver) {
                const commentaireMisAJour = await commentaireAAprouver.update({
                    Statut: "Approuvé"
                });
                res.status(201).json(commentaireMisAJour);
            }
            else {
                res.status(404).json({ "message": "Commentaire inconnu" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }
}