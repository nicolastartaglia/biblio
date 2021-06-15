const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./src/models");
const { emprunt, objet, bibliothecaire, abonne } = require("./src/models");
// const { abonne } = require("./src/models");
// const bibliothecaire = db.bibliothecaire;
// const abonne = db.abonne;
// const objet = db.objet;
// const emprunt = db.emprunt;

// db.sequelize.sync({ force: true });

db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
  initial();
});

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

function initial() {
// user.create({
//   id:1,
//   nom:"NOM1",
//   prenom:"PRENOM1"
// });
// user.create({
//   id:2,
//   nom:"NOM2",
//   prenom:"PRENOM2"
// });
// user.create({
//   id:3,
//   nom:"NOM3",
//   prenom:"PRENOM3"
// });
  bibliothecaire.create({
    Nom: "TARTAGLIA",
    Prenom: "Nicolas",
    Email: "ntartaglia@gmail.com",
    Password: "$2a$08$lTwGFPh6NoqCs4N/fvaR0un.LLsAE.eQhfBbfzBsmTiPmwo0RpXcy",
    Referent: "true",
    Statut: "Actif"
  });
  bibliothecaire.create({
    Nom: "TARTAGLIA",
    Prenom: "Stan",
    Email: "startaglia@gmail.com",
    Password: "$2a$08$H4HcG4AH5Ay.IzJxyGZ2Xek6XGDc0cX2MTgB1cAvDFFjLUm1OZAC.",
    Referent: "false",
    Statut: "Actif"
  });
 
  abonne.create({
    Nom: "GEFFROY",
    Prenom: "Yannick",
    Email: "ygeffroy@gmail.com",
    Rue: "17 rue Pierre Benoit",
    CodePostal: "Villejuif",
    Ville: "94800",
    DateLimiteAbonnement: new Date("2022-05-27"),
    Amende: 0.0,
    DateEmpruntPossible: new Date(),
    CreePar: 1,
    MisAJourPar: 1
  });
  abonne.create({
    Nom: "DUPOND",
    Prenom: "Pascal",
    Email: "pdupond@gmail.com",
    Rue: "25 rue Pierre Benoit",
    CodePostal: "Villejuif",
    Ville: "94800",
    DateLimiteAbonnement: new Date("2022-05-27"),
    Amende: 0.0,
    DateEmpruntPossible: new Date(),
    CreePar: 1,
    MisAJourPar: 1
  });

  emprunt.create({
    DateRetourLimite: new Date(),
    Statut: "Terminé"
  });
  
  objet.create({
    Titre: "Le rouge et le noir",
    AuteurScenariste: "Stendhal",
    Realisateur: "",
    Scenariste: "",
    Genre: "roman",
    Annee: "2019",
    Duree: 0,
    Description: "",
    Edition: "Belin et Gallimard",
    Pages: 640,
    Dessinateur: "",
    Artiste: "",
    Zone: "ET1",
    Travee: "B",
    EtagereBac: "201",
    Code3C: "STE",
    Etat: "",
    TypeObjet: "ecrit"
    // empruntId: null,
    // ReservePar: null,
    // CreePar: 2, 
    // MisAJourPar: 2
  });
 
  objet.create({
    Titre: "Germinal",
    AuteurScenariste: "Émile ZOLA",
    Realisateur: "",
    Scenariste: "",
    Genre: "roman",
    Annee: "2018",
    Duree: 0,
    Description: "",
    Edition: "Atlantic",
    Pages: 480,
    Dessinateur: "",
    Artiste: "",
    Zone: "ET2",
    Travee: "D",
    EtagereBac: "101",
    Code3C: "ZOL",
    Etat: "",
    TypeObjet: "ecrit"
    // empruntId: null,
    // ReservePar: null,
    // CreePar: 2,
    // MisAJourPar: 2
  });
  

}

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

require('./src/routes/bibliothecaire.routes')(app);
require('./src/routes/abonnes.routes')(app);
require('./src/routes/objets.routes')(app);
require('./src/routes/emprunts.routes')(app);
require('./src/routes/commentaires.routes')(app);


app.get("/", (req, res) => {
    res.json({ message: "Welcome to our application." });
});

  
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});