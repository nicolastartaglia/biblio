const controllerBibliothecaire = require("../controllers/bibliothecaire.controller");
const controllerConnexion = require("../controllers/auth.controller");
const middlewareVerification = require("../middleware");

module.exports = function (app) {

    // un nouveau bibliothécaire est créé après s'être assurer que l'email du nouveau bibliothécaire n'existe pas en base de données
    app.post("/bibliothecaire", [middlewareVerification.verifierUniciteEmail, middlewareVerification.verifierPresenceJeton], controllerConnexion.enregistrerUnBibliothecaire);

    // créer le jeton utilisateur lorsque le password crypté en BD correspond au password fourni à la connexion
    app.post("/bibliothecaire/connexion", controllerConnexion.seConnecterEnTantQueBibliothecaire);

    app.get("/bibliothecaire", middlewareVerification.verifierPresenceJeton, controllerBibliothecaire.obtenirTousLesBibliothecaires);
    app.get("/bibliothecaire/:bibliothecaireId", middlewareVerification.verifierPresenceJeton, controllerBibliothecaire.obtenirUnBibliothecaire);
    app.put("/bibliothecaire/:bibliothecaireId", middlewareVerification.verifierPresenceJeton, controllerBibliothecaire.mettreAJourUnBibliothecaire);
    app.delete("/bibliothecaire/:bibliothecaireId", middlewareVerification.verifierPresenceJeton, controllerBibliothecaire.supprimerUnBibliothecaire);
};