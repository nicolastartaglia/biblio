const controllerObjet = require("../controllers/objet.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {
    app.get("/objet/:objetId" ,controllerObjet.obtenirUnObjet);
    app.put("/objet/:objetId", controllerObjet.mettreAJourUnObjet);
    app.delete("/objet/:objetId", controllerObjet.supprimerUnObjet);
    app.post("/objet", controllerObjet.ajouterUnObjet);
    app.post("/objet/recherche", controllerObjet.obtenirQuelquesObjets);
};