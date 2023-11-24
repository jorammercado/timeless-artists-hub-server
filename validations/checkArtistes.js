const { getAllArtistes } = require("../queries/artistes")

const checkArtistes = async (req, res, next) => {
    const allArtistes = await getAllArtistes()
    if (allArtistes[0]) {
        return next()
    }
    else {
        res.status(500).json({ error: "server error in getAllArtistes, list validation failed" })
    }
}

const checkArtisteIndex = async (req, res, next) => {
    const allArtistes = await getAllArtistes()
    const { id } = req.params
    const ids = allArtistes.map(e => e.id)
    if (ids.includes(Number(id)))
        return next()
    else
        res.status(400).json({ error: "server error in checkArtisteIndex, id validation failed" })
}

const checkArtisteName = (req, res, next) => {
    if (req.body.artiste_name) {
        return next()
    }
    else {
        res.status(400).json({ error: "artiste_name is required, name validation failed" })
    }
}

const checkIsFavoriteBoolean = (req, res, next) => {
    const { is_favorite } = req.body
    if (is_favorite == "true" ||
        is_favorite == "false" ||
        is_favorite == undefined ||
        typeof is_favorite == "boolean")
        return next()
    else
        res.status(400).json({ error: "is_favorite must be a bool value, bool validation failed" })
}

module.exports = {
    checkArtistes,
    checkArtisteIndex,
    checkArtisteName,
    checkIsFavoriteBoolean
}