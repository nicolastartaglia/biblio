const controllerCommentaire = require("../controllers/commentaire.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {
    app.get("/commentaire/objet/:objetId", controllerCommentaire.obtenirTousLesCommentairesApprouvesSurUnObjet);
    app.get("/commentaire", middlewareVerification.verifierPresenceJeton, controllerCommentaire.obtenirTousLesCommentairesEnAttente);
    app.delete("/commentaire/:commentaireId", controllerCommentaire.supprimerCommentaire);
    app.put("/commentaire/:commentaireId", controllerCommentaire.approuverCommentaire);
}