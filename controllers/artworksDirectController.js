const express = require("express")
const artworksDirect = express.Router()

const { getAllArtworksDirect,
    getOneArtworkDirect,
    deleteArtworkDirect,
    updateArtworkDirect
} = require("../queries/artworksDirect")
const { checkArtworksDirect,
    checkArtworkIndexDirect,
    checkArtworkNameDirect,
    checkIsFavoriteBooleanDirect,
    checkStyleLengthDirect,
    checkDateCreatedLengthDirect,
    checkImageLinkFormatDirect
} = require("../validations/checkArtworksDirect.js")

artworksDirect.get("/", checkArtworksDirect, async (req, res) => {
    try {
        let allArtworks = await getAllArtworksDirect()
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
                    if (a.style.toLowerCase() <
                        b.style.toLowerCase())
                        return -1
                    else if (a.style.toLowerCase() >
                        b.style.toLowerCase())
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
            if (req.query.order === "asc" ||
                req.query.order === "ascArtiste" ||
                req.query.order === "ascStyle" ||
                req.query.order === "ascDate")
                res.status(200).json(allArtworks)
            else if (req.query.order === "desc" ||
                req.query.order === "descArtiste" ||
                req.query.order === "descStyle" ||
                req.query.order === "descDate") {
                allArtworks = allArtworks.reverse()
                res.status(200).json(allArtworks)
            }
            else
                res.status(400).json({
                    error: `Order query error in` +
                        ` index path for artworks Direct.`
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
                        ` in index path for artworks Direct.`
                })
        }
        else {
            res.status(200).json(allArtworks)
        }
    }
    catch (error) {
        res.status(400).json({
            error: `${error}, error in index` +
                ` controller path for artworks Direct.`
        })
    }
})

artworksDirect.get("/:id", checkArtworkIndexDirect, async (req, res) => {
    try {
        const { id } = req.params
        const artwork = await getOneArtworkDirect(id)
        res.status(200).json(artwork)
    }
    catch (error) {
        res.status(400).json({
            error: `${error}, error in show` +
                ` controller path for artworks Direct`
        })
    }
})

artworksDirect.delete("/:id", checkArtworkIndexDirect, async (req, res) => {
    try {
        const { id } = req.params
        const deletedArtwork = await deleteArtworkDirect(id)
        if (deletedArtwork) {
            res.status(200).json(deletedArtwork)
        } else {
            res.status(404).json({ error: "Artwork not found." })
        }
    }
    catch (error) {
        res.status(400).json({
            error: `${error}, error in delete` +
                ` controller path for artworks Direct`
        })
    }
})

artworksDirect.put("/:id",
    checkArtworkNameDirect,
    checkIsFavoriteBooleanDirect,
    checkStyleLengthDirect,
    checkDateCreatedLengthDirect,
    checkImageLinkFormatDirect,
    checkArtworkIndexDirect, async (req, res) => {
        try {
            const { id } = req.params
            const updatedArtworkData = req.body
            updatedArtworkData.style = !updatedArtworkData.style ?
                "style unknown" : updatedArtworkData.style
            updatedArtworkData.date_created = !updatedArtworkData.date_created ?
                "0 - unknown date created" : updatedArtworkData.date_created
            updatedArtworkData.img_link = !updatedArtworkData.img_link ?
                "image link not available" : updatedArtworkData.img_link
            updatedArtworkData.is_favorite = !updatedArtworkData.is_favorite ?
                false : updatedArtworkData.is_favorite
            const updatedArtwork = await updateArtworkDirect(id, updatedArtworkData)
            res.status(200).json(updatedArtwork)
        }
        catch (error) {
            res.status(400).json({
                error: `${error}, error in update controller` +
                    ` path for artworks - direct`
            })
        }
    }
)


module.exports = artworksDirect