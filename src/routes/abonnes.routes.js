const controllerAbonne = require("../controllers/abonne.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {
    app.get("/abonne/:abonneId", middlewareVerification.verifierPresenceJeton, controllerAbonne.obtenirUnAbonne);
    app.put("/abonne/:abonneId", middlewareVerification.verifierPresenceJeton, controllerAbonne.mettreAJourUnAbonne);
    app.delete("/abonne/:abonneId", middlewareVerification.verifierPresenceJeton, controllerAbonne.supprimerUnAbonne);
    app.post("/abonne", middlewareVerification.verifierPresenceJeton, controllerAbonne.ajouterUnAbonne);
    app.post("/abonne/recherche", middlewareVerification.verifierPresenceJeton, controllerAbonne.obtenirQuelquesAbonnes);
};