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

const checkArtworkNameDirect = (req, res, next) => {
    if (req.body.artwork_name) {
        return next()
    }
    else {
        res.status(400).json({
            error: `artwork_name is required,` +
                ` name validation failed for artwork data - direct`
        })
    }
}

const checkIsFavoriteBooleanDirect = (req, res, next) => {
    const { is_favorite } = req.body
    if (is_favorite === "true" ||
        is_favorite === "false" ||
        is_favorite === undefined ||
        typeof is_favorite === "boolean")
        return next()
    else
        res.status(400).json({
            error: `is_favorite must be a bool value,` +
                ` bool validation failed for artwork data - direct`
        })
}

const checkStyleLengthDirect = (req, res, next) => {
    const { style } = req.body
    if (style === undefined || style.length <= 35)
        return next()
    else
        res.status(400).json({
            error: `style length must be <= 35,` +
                ` current length=${style.length},` +
                ` style length validation failed - direct`
        })
}

const checkDateCreatedLengthDirect = (req, res, next) => {
    const { date_created } = req.body
    if (date_created === undefined || date_created.length <= 35)
        return next()
    else
        res.status(400).json({
            error: `date created length must be <= 15,` +
                ` current length=${date_created.length},` +
                ` date created length validation failed - direct`
        })
}

const checkImageLinkFormatDirect = (req, res, next) => {
    const { img_link } = req.body
    if (img_link === undefined || /^https:\/\/|^http:\/\//.test(img_link) ||
        img_link === "")
        return next()
    else
        res.status(400).json({
            error: `image link must start as https:// or http://,` +
                ` img_link validation failed - direct`
        })
}

module.exports = {
    checkArtworksDirect,
    checkArtworkIndexDirect,
    checkArtworkNameDirect,
    checkIsFavoriteBooleanDirect,
    checkStyleLengthDirect,
    checkDateCreatedLengthDirect,
    checkImageLinkFormatDirect
}
