const emprunt = require("../models").emprunt;
const objet = require("../models").objet;
const abonne = require("../models").abonne;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
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
    },
    async obtenirLaListeDesObjetsEmpruntes(req, res) {
        try {
            const objetsEmpruntes = await objet.findAll({
                where: {
                    empruntId: req.params.empruntId
                }
            });
            if (objetsEmpruntes) {
                res.status(201).json(objetsEmpruntes);
            }
            else {
                res.status(200).json({ "message": "Pas d'objet emprunté" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    },
    async retournerDesObjets(req, res) {
        try {
            console.log(req.body);
            const empruntAMettreAJour = await emprunt.update({
                DateRetour: new Date(),
                Statut: "Terminé",
                RetourEnregistrePar: req.body.bibliothecaireId
            }, { where : { id : req.body.empruntId }});
            if(empruntAMettreAJour){
                const abonneAMettreAJour = await abonne.update({
                    Amende: req.body.Amende
                }, { where: { id: req.body.abonneId }});
                if(abonneAMettreAJour){
                    req.body.objetsRetournes.forEach(async (element) => {
                        const objetAMettreAJour = await objet.update({ empruntId: null, Etat: element.Etat }, { where: { id: element.id }});
                    });
                    res.status(201).json({"message": "Retour enregistré"});
                } else {
                    res.status(201).json({"message": "Abonné et objets non mis à jour"});
                }
            } else {
                res.status(201).json({ "message": "Retour non enregistré"});
            }
        }
        catch (e) {
                console.log(e);
                res.status(400).send(e);
        }
    }
}