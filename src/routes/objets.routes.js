const controllerObjet = require("../controllers/objet.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {
    app.get("/objet/:objetId", middlewareVerification.verifierPresenceJeton, controllerObjet.obtenirUnObjet);
    app.put("/objet/:objetId", middlewareVerification.verifierPresenceJeton, controllerObjet.mettreAJourUnObjet);
    app.delete("/objet/:objetId", middlewareVerification.verifierPresenceJeton, controllerObjet.supprimerUnObjet);
    app.post("/objet", middlewareVerification.verifierPresenceJeton, controllerObjet.ajouterUnObjet);
    app.post("/objet/recherche", middlewareVerification.verifierPresenceJeton, controllerObjet.obtenirQuelquesObjets);
};