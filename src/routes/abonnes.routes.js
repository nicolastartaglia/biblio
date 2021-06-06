const controllerAbonne = require("../controllers/abonne.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {
    app.get("/abonne/:abonneId", middlewareVerification.verifierPresenceJeton, controllerAbonne.obtenirUnAbonne);
    app.put("/abonne/:abonneId", middlewareVerification.verifierPresenceJeton, controllerAbonne.mettreAJourUnAbonne);
    app.put("/abonne/payerAmende/:abonneId", controllerAbonne.payerLAmende);
    app.put("/abonne/renouvelerAbonnement/:abonneId", controllerAbonne.renouvelerAbonnement);  
    app.delete("/abonne/:abonneId", middlewareVerification.verifierPresenceJeton, controllerAbonne.supprimerUnAbonne);
    app.post("/abonne", middlewareVerification.verifierPresenceJeton, controllerAbonne.ajouterUnAbonne);
    app.post("/abonne/recherche", middlewareVerification.verifierPresenceJeton, controllerAbonne.obtenirQuelquesAbonnes);
    app.get("/abonne/emprunt/:abonneId", controllerAbonne.obtenirLeDernierEmpruntDunAbonne);

};