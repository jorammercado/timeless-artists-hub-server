const express = require("express")
const artworks = express.Router({ mergeParams: true })
const { getOneArtiste } = require("../queries/artistes")

const { getAllArtworks,
    getOneArtwork
} = require("../queries/artworks")
const { checkArtworks,
    checkArtisteIndex,
    checkArtworkIndex
} = require("../validations/checkArtworks.js")


artworks.get("/", checkArtworks, checkArtisteIndex, async (req, res) => {
    try {
        const { artiste_id } = req.params
        const artiste = await getOneArtiste(artiste_id)
        let allArtworks = await getAllArtworks(artiste_id)
        if (req.query.order) {
            allArtworks.sort((a, b) => {
                if (req.query.order === "asc" || req.query.order === "desc") {
                    if (a.artwork_name.toLowerCase() < b.artwork_name.toLowerCase())
                        return -1
                    else if (a.artwork_name.toLowerCase() > b.artwork_name.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascArtiste" || req.query.order === "descArtiste") {
                    if (a.artiste_name.toLowerCase() < b.artiste_name.toLowerCase())
                        return -1
                    else if (a.artiste_name.toLowerCase() > b.artiste_name.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascStyle" || req.query.order === "descStyle") {
                    if (a.style.toLowerCase() < b.style.toLowerCase())
                        return -1
                    else if (a.style.toLowerCase() > b.style.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascDate" || req.query.order === "descDate") {
                    const aNumFirst = a.date_created.match(/(\d+)/)
                    const bNumFirst = b.date_created.match(/(\d+)/)
                    if (aNumFirst < bNumFirst)
                        return -1
                    else if (aNumFirst > bNumFirst)
                        return 1
                    else
                        return 0
                }
            })
            if (req.query.order === "asc" || req.query.order === "ascArtiste" ||
                req.query.order === "ascStyle" || req.query.order === "ascDate")
                res.status(200).json({ ...artiste, allArtworks })
            else if (req.query.order === "desc" || req.query.order === "descArtiste" ||
                req.query.order === "descStyle" || req.query.order === "descDate") {
                allArtworks = allArtworks.reverse()
                res.status(200).json({ ...artiste, allArtworks })
            }
            else
                res.status(400).json({ error: "Order query error in index path for artworks." })
        }
        else if (req.query.is_favorite) {
            if (req.query.is_favorite === "true") {
                allArtworks = allArtworks.filter(current => {
                    return current.is_favorite === true
                })
                res.status(200).json({ ...artiste, allArtworks })
            }
            else if (req.query.is_favorite === "false") {
                allArtworks = allArtworks.filter(current => {
                    return current.is_favorite === false
                })
                res.status(200).json({ ...artiste, allArtworks })
            }
            else
                res.status(400).json({ error: "Is favorite query error in index path for artworks." })
        }
        else {
            res.status(200).json({ ...artiste, allArtworks })
        }
    }
    catch (error) {
        res.status(400).json({ error, typeInd: "Error in index controller path for artworks." })
    }
})

artworks.get("/:id", checkArtisteIndex, checkArtworkIndex, async (req, res) => {
    try {
        const { artiste_id, id } = req.params
        const artwork = await getOneArtwork(id)
        res.status(200).json(artwork)
    }
    catch (error) {
        res.status(400).json({ error, typeGet: "Error in show controller path for artworks" })
    }
})


module.exports = artworks