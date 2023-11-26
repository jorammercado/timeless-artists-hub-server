const { getAllArtworksDirect } = require("../queries/artworksDirect")

const checkArtworksDirect = async (req, res, next) => {
    const allArtworks = await getAllArtworksDirect()
    if (allArtworks[0]) {
        return next()
    }
    else {
        res.status(500).json({
            error: `server error in getAllArtworksDirect,` +
                ` list validation failed`
        })
    }
}

const checkArtworkIndexDirect = async (req, res, next) => {
    const { id } = req.params
    const allArtworks = await getAllArtworksDirect()
    const ids = allArtworks.map(e => e.id)
    if (ids.includes(Number(id)))
        return next()
    else
        res.status(400).json({
            error: `server error in checkArtworkIndexDirect,` +
                ` id validation failed for artworks Direct`
        })
}

module.exports = {
    checkArtworksDirect,
    checkArtworkIndexDirect
}
