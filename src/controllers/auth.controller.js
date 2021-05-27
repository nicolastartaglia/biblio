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
                where: { Email: req.body.Email, Statut: 'Actif' } 
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
                const token = jwt.sign({ 
                    id: unBibliothecaire.id,
                    Nom: unBibliothecaire.Nom,
                    Prenom: unBibliothecaire.Prenom,
                    Email: unBibliothecaire.Email,
                    Referent: unBibliothecaire.Referent
                     }, config.secret, {
                    expiresIn: 86400 // 24 heures de validité
                });
                return res.status(201).send({
                    accessToken: token
                });
            }
            else {
                res.status(200).json({"message": "bibliothecaire inconnu ou suspendu"});
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send(e);
        }
    }
}
