const controllerBibliothecaire = require("../controllers/bibliothecaire.controller");
const controllerConnexion = require("../controllers/auth.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {

    // un nouveau bibliothécaire est créé après s'être assurer que l'email du nouveau bibliothécaire n'existe pas en base de données
    app.post("/bibliothecaire", middlewareVerification.verifierUniciteEmail, controllerConnexion.enregistrerUnBibliothecaire);

    // créer le jeton utilisateur lorsque le password crypté en BD correspond au password fourni à la connexion
    app.post("/bibliothecaire/connexion", controllerConnexion.seConnecterEnTantQueBibliothecaire);

    app.get("/bibliothecaire", controllerBibliothecaire.obtenirTousLesBibliothecaires);
    app.get("/bibliothecaire/:bibliothecaireId", controllerBibliothecaire.obtenirUnBibliothecaire);
    app.put("/bibliothecaire/:bibliothecaireId", controllerBibliothecaire.mettreAJourUnBibliothecaire);
    app.delete("/bibliothecaire/:bibliothecaireId", controllerBibliothecaire.supprimerUnBibliothecaire);
};