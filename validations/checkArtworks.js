const { getAllArtworks } = require("../queries/artworks")
const { getAllArtistes } = require("../queries/artistes")

const checkArtworks = async (req, res, next) => {
    const { artiste_id } = req.params
    const allArtworks = await getAllArtworks(artiste_id)
    if (allArtworks[0]) {
        return next()
    }
    else {
        res.status(500).json({
            error: `server error in getAllArtworks,` +
                ` list validation failed`
        })
    }
}

const checkArtisteIndex = async (req, res, next) => {
    const allArtistes = await getAllArtistes()
    const { artiste_id } = req.params
    const ids = allArtistes.map(e => e.id)
    if (ids.includes(Number(artiste_id)))
        return next()
    else
        res.status(400).json({
            error: `server error in checkArtisteIndex,` +
                ` id validation failed`
        })
}

const checkArtworkIndex = async (req, res, next) => {
    const { artiste_id, id } = req.params
    const allArtworks = await getAllArtworks(artiste_id)
    const ids = allArtworks.map(e => e.id)
    if (ids.includes(Number(id)))
        return next()
    else
        res.status(400).json({
            error: `server error in checkArtworkIndex,` +
                ` id validation failed for artworks`
        })
}

const checkArtworkName = (req, res, next) => {
    if (req.body.artwork_name) {
        return next()
    }
    else {
        res.status(400).json({
            error: `artwork_name is required,` +
                ` name validation failed for artwork data`
        })
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
        res.status(400).json({
            error: `is_favorite must be a bool value,` +
                ` bool validation failed for artwork data`
        })
}

const checkStyleLength = (req, res, next) => {
    const { style } = req.body
    if (style == undefined || style.length <= 35)
        return next()
    else
        res.status(400).json({
            error: `style length must be <= 35,` +
                ` current length=${style.length},` +
                ` style length validation failed`
        })
}

const checkDateCreatedLength = (req, res, next) => {
    const { date_created } = req.body
    if (date_created == undefined || date_created.length <= 35)
        return next()
    else
        res.status(400).json({
            error: `date created length must be <= 15,` +
                ` current length=${date_created.length},` +
                ` date created length validation failed`
        })
}

const checkImageLinkFormat = (req, res, next) => {
    const { img_link } = req.body
    if (img_link == undefined || /^https:\/\/|^http:\/\//.test(img_link))
        return next()
    else
        res.status(400).json({
            error: `image link must start as https:// or http://,` +
                ` img_link validation failed`
        })
}



module.exports = {
    checkArtworks,
    checkArtisteIndex,
    checkArtworkIndex,
    checkArtworkName,
    checkIsFavoriteBoolean,
    checkStyleLength,
    checkDateCreatedLength,
    checkImageLinkFormat
}
