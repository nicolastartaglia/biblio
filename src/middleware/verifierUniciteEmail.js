const db = require("../models");

const bibliothecaire = db.bibliothecaire;

module.exports = async (req, res, next) => {
    try {
        console.log(req.body.Email);
        const unBibliothecaire = await bibliothecaire.findOne({
            where: { Email: req.body.Email }
        });
        console.log(unBibliothecaire);
        if (unBibliothecaire) {
            res.status(400).send("Cet email exsite déjà!");
            return;
        }
        next();
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};
