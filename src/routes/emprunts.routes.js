const controllerEmprunt = require("../controllers/emprunt.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {
    app.post("/emprunt", middlewareVerification.verifierPresenceJeton, controllerEmprunt.emprunterDesObjets);
    app.post("/emprunt/retour", middlewareVerification.verifierPresenceJeton, controllerEmprunt.retournerDesObjets);
    app.get("/emprunt/:empruntId", middlewareVerification.verifierPresenceJeton, controllerEmprunt.obtenirLaListeDesObjetsEmpruntes);

};