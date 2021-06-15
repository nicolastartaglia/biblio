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
                res.status(404).json({"message": "Pas de commentaire"})
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }


}