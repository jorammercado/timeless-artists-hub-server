const express = require("express")
const artistes = express.Router()
const {
    getAllArtistes
} = require("../queries/artistes")
const {
    checkArtistes
} = require("../validations/checkArtistes")

artistes.get("/", checkArtistes, async (req, res) => {
    try {
        const allArtistes = await getAllArtistes()
        if (req.query.order) {
            allArtistes.sort((a, b) => {
                if (req.query.order === "asc" || req.query.order === "desc") {
                    if (a.artiste_name.toLowerCase() < b.artiste_name.toLowerCase())
                        return -1
                    else if (a.artiste_name.toLowerCase() > b.artiste_name.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascGen" || req.query.order === "descGen") {
                    if (a.genre.toLowerCase() < b.genre.toLowerCase())
                        return -1
                    else if (a.genre.toLowerCase() > b.genre.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascNa" || req.query.order === "descNa") {
                    if (a.nationality.toLowerCase() < b.nationality.toLowerCase())
                        return -1
                    else if (a.nationality.toLowerCase() > b.nationality.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascBir" || req.query.order === "descBir")
                    return a.birth_year - b.birth_year
            })
            if (req.query.order === "asc" || req.query.order === "ascGen" ||
                req.query.order === "ascNa" || req.query.order === "ascBir")
                res.json(allArtistes)
            else if (req.query.order === "desc" || req.query.order === "descGen" ||
                req.query.order === "descNa" || req.query.order === "descBir")
                res.json(allArtistes.reverse())
            else
                res.send({ error: "Order query error in index path." })
        }
        else if (req.query.is_favorite) {
            if (req.query.is_favorite === "true") {
                allArtistes = allArtistes.filter(current => {
                    return current.is_favorite === true
                })
                res.json(allArtistes)
            }
            else if (req.query.is_favorite === "false") {
                allArtistes = allArtistes.filter(current => {
                    return current.is_favorite === false
                })
                res.json(allArtistes)
            }
            else
                res.send({ error: "Is favorite query error in index path." })
        }
        else
            res.status(200).json(allArtistes)
    }
    catch (error) {
        res.send({ error, type: "Error in index controller path." })
    }
})


module.exports = artistes
