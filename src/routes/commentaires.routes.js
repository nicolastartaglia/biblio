const controllerCommentaire = require("../controllers/commentaire.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {
    app.get("/commentaire/objet/:objetId", controllerCommentaire.obtenirTousLesCommentairesApprouvesSurUnObjet);
}