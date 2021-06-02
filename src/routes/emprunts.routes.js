const controllerEmprunt = require("../controllers/emprunt.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {
    app.get("/emprunt/:empruntId", controllerEmprunt.obtenirUnEmprunt);
    app.put("/emprunt/:empruntId", controllerEmprunt.mettreAJourUnEmprunt);
    app.post("/emprunt", controllerEmprunt.ajouterUnEmprunt);
};