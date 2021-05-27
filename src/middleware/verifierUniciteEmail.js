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
            res.status(200).json({"message":"L'email saisi est attaché à un compte existant!"});
            return;
        }
        next();
    }
    catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};
