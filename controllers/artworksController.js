const express = require("express")
const artworks = express.Router({ mergeParams: true })
const { getOneArtiste } = require("../queries/artistes")

const { getAllArtworks,
    getOneArtwork,
    deleteArtwork,
    createArtwork,
    updateArtwork
} = require("../queries/artworks")
const { checkArtworks,
    checkArtisteIndex,
    checkArtworkIndex,
    checkArtworkName,
    checkIsFavoriteBoolean,
    checkStyleLength,
    checkDateCreatedLength,
    checkImageLinkFormat
} = require("../validations/checkArtworks.js")


artworks.get("/", checkArtworks, checkArtisteIndex, async (req, res) => {
    try {
        const { artiste_id } = req.params
        const artiste = await getOneArtiste(artiste_id)
        let allArtworks = await getAllArtworks(artiste_id)
        if (req.query.order) {
            allArtworks.sort((a, b) => {
                if (req.query.order === "asc" ||
                    req.query.order === "desc") {
                    if (a.artwork_name.toLowerCase() <
                        b.artwork_name.toLowerCase())
                        return -1
                    else if (a.artwork_name.toLowerCase() >
                        b.artwork_name.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascArtiste" ||
                    req.query.order === "descArtiste") {
                    if (a.artiste_name.toLowerCase() <
                        b.artiste_name.toLowerCase())
                        return -1
                    else if (a.artiste_name.toLowerCase() >
                        b.artiste_name.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascStyle" ||
                    req.query.order === "descStyle") {
                    if (a.style.toLowerCase() < b.style.toLowerCase())
                        return -1
                    else if (a.style.toLowerCase() > b.style.toLowerCase())
                        return 1
                    else
                        return 0
                }
                else if (req.query.order === "ascDate" ||
                    req.query.order === "descDate") {
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
            else if (req.query.order === "desc" ||
                req.query.order === "descArtiste" ||
                req.query.order === "descStyle" ||
                req.query.order === "descDate") {
                allArtworks = allArtworks.reverse()
                res.status(200).json({ ...artiste, allArtworks })
            }
            else
                res.status(400).json({
                    error: `Order query error` +
                        ` in index path for artworks.`
                })
        }
        else if (req.query.is_favorite) {
            if (req.query.is_favorite === "true") {
                res.status(200).json(allArtworks.filter(current => { 
                    return current.is_favorite === true
                }))
            }
            else if (req.query.is_favorite === "false") {
                res.status(200).json(allArtworks.filter(current => { 
                    return current.is_favorite === false
                }))
            }
            else
                res.status(400).json({
                    error: `Is favorite query error` +
                        ` in index path for artworks.`
                })
        }
        else {
            res.status(200).json({ ...artiste, allArtworks })
        }
    }
    catch (error) {
        res.status(400).json({
            error: `${error}, error in index` +
                ` controller path for artworks.`
        })
    }
})

artworks.get("/:id", checkArtisteIndex, checkArtworkIndex, async (req, res) => {
    try {
        const { artiste_id, id } = req.params
        const artwork = await getOneArtwork(id)
        res.status(200).json(artwork)
    }
    catch (error) {
        res.status(400).json({
            error: `${error}, error in show` +
                ` controller path for artworks`
        })
    }
})

artworks.delete("/:id", checkArtisteIndex, checkArtworkIndex, async (req, res) => {
    try {
        const { id } = req.params
        const deletedArtwork = await deleteArtwork(id)
        if (deletedArtwork) {
            res.status(200).json(deletedArtwork)
        } else {
            res.status(404).json({ error: "Artwork not found." })
        }
    }
    catch (error) {
        res.status(400).json({
            error: `${error}, error in delete` +
                ` controller path for artworks`
        })
    }
})

artworks.post("/", checkArtisteIndex,
    checkArtworkName,
    checkIsFavoriteBoolean,
    checkStyleLength,
    checkDateCreatedLength,
    checkImageLinkFormat, async (req, res) => {
        try {
            const { artiste_id } = req.params
            const artiste = await getOneArtiste(artiste_id)
            const artworkData = req.body
            artworkData.artiste_name = artiste.artiste_name
            artworkData.style = !artworkData.style ?
                "style unknown" : artworkData.style
            artworkData.date_created = !artworkData.date_created ?
                "unknown date" : artworkData.date_created
            artworkData.img_link = !artworkData.img_link ?
                "image link not available" : artworkData.img_link
            artworkData.is_favorite = typeof artworkData.is_favorite !== 'boolean' ?
                false : artworkData.is_favorite
            artworkData.artiste_id = artiste_id
            const newArtwork = await createArtwork(artworkData)
            res.status(200).json(newArtwork)
        }
        catch (error) {
            res.status(400).json({
                error: `${error}, error in new` +
                    ` controller path for artworks`
            })
        }
    }
)

artworks.put("/:id", checkArtisteIndex,
    checkArtworkName,
    checkIsFavoriteBoolean,
    checkStyleLength,
    checkDateCreatedLength,
    checkImageLinkFormat,
    checkArtworkIndex, async (req, res) => {
        try {
            const { id } = req.params
            const updatedArtworkData = req.body
            updatedArtworkData.style = !updatedArtworkData.style ?
                "style unknown" : updatedArtworkData.style
            updatedArtworkData.date_created = !updatedArtworkData.date_created ?
                "unknown date" : updatedArtworkData.date_created
            updatedArtworkData.img_link = !updatedArtworkData.img_link ?
                "image link not available" : updatedArtworkData.img_link
            updatedArtworkData.is_favorite = typeof updatedArtworkData.is_favorite !== 'boolean' ?
                false : updatedArtworkData.is_favorite
            const updatedArtwork = await updateArtwork(id, updatedArtworkData)
            res.status(200).json(updatedArtwork)
        }
        catch (error) {
            res.status(400).json({
                error: `${error}, error in update` +
                    ` controller path for artworks`
            })
        }
    }
)


module.exports = artworks