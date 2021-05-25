const express = require("express");
const cors = require("cors");

const app = express();

const db = require("./src/models");
const bibliothecaire = db.bibliothecaire;

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
    Statut: "actif"
  });

}

app.use(cors());

app.use(express.json());

app.use(express.urlencoded());

require('./src/routes/bibliothecaire.routes')(app);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to our application." });
});

  
const PORT = process.env.PORT || 8082;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});