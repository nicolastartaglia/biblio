const db = require("../models");
const config = require("../config/auth.config");
const bibliothecaire = db.bibliothecaire;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = {
    async enregistrerUnBibliothecaire(req, res) {
        try {
            const unNouveauBibliothecaire = await bibliothecaire.create({
                Nom: req.body.Nom,
                Prenom: req.body.Prenom,
                Email: req.body.Email,
                Password: bcrypt.hashSync(req.body.Password, 8),
                Referent: req.body.Referent,
                Statut: req.body.Statut
            });
            res.status(201).send(unNouveauBibliothecaire)
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async seConnecterEnTantQueBibliothecaire(req, res) {
        try {
            const unBibliothecaire = await bibliothecaire.findOne({
                where: { Email: req.body.Email }
            });
            if (unBibliothecaire) {
                const passwordIsValid = bcrypt.compareSync(
                    req.body.Password,
                    unBibliothecaire.Password
                );
                if (!passwordIsValid) {
                    return res.status(401).send({
                        accessToken: null,
                        message: "Mot de passe invalide!"
                    });
                }
                const token = jwt.sign({ id: unBibliothecaire.id }, config.secret, {
                    expiresIn: 86400 // 24 hours
                });
                return res.status(201).send({
                    id: unBibliothecaire.id,
                    email: unBibliothecaire.Email,
                    accessToken: token
                });
            }
            else {
                res.status(404).send("bibliothecaire inconnu")
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}
