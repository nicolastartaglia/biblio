const emprunt = require("../models").emprunt;
const objet = require("../models").objet;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
    // async obtenirUnEmprunt(req, res) {
    //     try {
    //         const unEmprunt = await emprunt.findOne({
    //             where: { id: req.params.empruntId }
    //         });
    //         if (unEmprunt) {
    //             res.status(201).json(unEmprunt);
    //         }
    //         else {
    //             res.status(200).json({ "message": "Ce numéro d'emprunt n'existe pas!" });
    //         }
    //     }
    //     catch (e) {
    //         console.log(e);
    //         res.status(500).send(e);
    //     }
    // },
    // async mettreAJourUnEmprunt(req, res) {
    //     try {
    //         const empruntAMettreAJour = await emprunt.findOne({
    //             where: { id: req.params.empruntId }
    //         });
    //         if (empruntAMettreAJour) {
    //             const empruntMisAJour = await empruntAMettreAJour.update({
    //                 DateEmprunt: new Date(req.body.DateEmprunt),
    //                 DateRetour: new Date(req.body.DateRetour),
    //                 DateRetourLimite: new Date(DateRetourLimite),
    //                 Statut: req.body.Statut,
    //                 abonneId: req.body.abonneId,
    //                 EmpruntEnregistrePar: req.body.EmpruntEnregistrePar,
    //                 RetourEnregistrePar: req.body.RetourEnregistrePar
    //             });
    //             res.status(201).json(empruntMisAJour);

    //         }
    //         else {
    //             res.status(200).json({ "message": "emprunt inconnu" });
    //         }
    //     }
    //     catch (e) {
    //         console.log(e);
    //         res.status(400).send(e);
    //     }
    // },
    // async ajouterUnEmprunt(req, res) {
    //     try {
    //         console.log("ajout");
    //         const unNouvelEmprunt = await emprunt.create({
    //             DateEmprunt: new Date(req.body.DateEmprunt),
    //             DateRetour: new Date(req.body.DateRetour),
    //             DateRetourLimite: new Date(DateRetourLimite),
    //             Statut: req.body.Statut,
    //             abonneId: req.body.abonneId,
    //             EmpruntEnregistrePar: req.body.EmpruntEnregistrePar,
    //             RetourEnregistrePar: req.body.RetourEnregistrePar
    //         });
    //         res.status(201).json(unNouvelEmprunt);
    //     }
    //     catch (e) {
    //         console.log(e);
    //         res.status(400).send(e);
    //     }
    // },
    async emprunterDesObjets(req,res) {
        try {
            console.log("données transmises");
            console.log(req.body.objetsEmpruntes);
            const objetsEmpruntes = await objet.findAll({
                where: {
                    id: {
                            [Op.in]: req.body.objetsEmpruntes
                    }
                }
            });
            console.log("liste des objets");
            console.log(objetsEmpruntes);
            if (objetsEmpruntes) {
                const unNouvelEmprunt = await emprunt.create({
                    DateEmprunt: new Date(),
                    DateRetourLimite: new Date((new Date()).setDate((new Date()).getDate() + parseInt(req.body.dureeEmprunt))),
                    Statut: "Ouvert",
                    abonneId: parseInt(req.body.abonneId),
                    EmpruntEnregistrePar: parseInt(req.body.bibliothecaireId)
                });
                if (unNouvelEmprunt){
                    console.log("emprunt créé");
                    console.log(unNouvelEmprunt);
                    const objetsEmpruntesAMettreAJour = await objet.update({ empruntId : unNouvelEmprunt.id },{ where : { id : req.body.objetsEmpruntes }}); 
                    res.status(201).json({"message": "Emprunt enregistré"});
                } else {
                    res.status(201).json({ "message": "Emprunt non enregistré"});
                } 
            }
            else {
                res.status(200).json({ "message": "Pas d'objet emprunté" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }

}