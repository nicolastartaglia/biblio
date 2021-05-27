const controllerAbonne = require("../controllers/abonne.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {
    app.get("/abonne",  controllerAbonne.obtenirTousLesAbonnes);
    app.get("/abonne/:abonneId", controllerAbonne.obtenirUnAbonne);
    app.put("/abonne/:abonneId", controllerAbonne.mettreAJourUnAbonne);
    app.delete("/abonne/:abonneId", controllerAbonne.supprimerUnAbonne);
    app.post("/abonne", controllerAbonne.ajouterUnAbonne);
};