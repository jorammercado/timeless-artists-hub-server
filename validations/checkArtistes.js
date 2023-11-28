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
        res.status(400).json({ error: "artist name is required, name validation failed" })
    }
}

const checkIsFavoriteBoolean = (req, res, next) => {
    const { is_favorite } = req.body
    if (is_favorite === "true" ||
        is_favorite === "false" ||
        is_favorite === undefined ||
        typeof is_favorite === "boolean")
        return next()
    else
        res.status(400).json({ error: "is_favorite must be a bool value, bool validation failed" })
}

const checkIsNumberBirth = (req, res, next) => {
    const { birth_year } = req.body
    if (birth_year === undefined ||
        typeof birth_year === "number")
        return next()
    else
        res.status(400).json({ error: "birth_year must be number type, birth_year validation failed" })
}

const checkIsNumberDeath = (req, res, next) => {
    const { death_year } = req.body
    if (death_year === undefined ||
        typeof death_year === "number")
        return next()
    else
        res.status(400).json({ error: "death_year must be number type, death_year validation failed" })
}

const checkWikiLink = (req, res, next) => {
    const { wikipedia_link } = req.body
    if (/^http:\/\/en.wikipedia.org\/wiki\/|^https:\/\/en.wikipedia.org\/wiki\//.test(wikipedia_link) ||
        wikipedia_link === null || wikipedia_link === "" || wikipedia_link === undefined)
        return next()
    else
        res.status(400).json({
            error: `wikipedia link must start as http://en.wikipedia.org/wiki/,` +
                ` wikipedia_link validation failed, input=${wikipedia_link}`
        })
}

const checkYouTubeLink = (req, res, next) => {
    const { youtube_link } = req.body
    if ( /^https:\/\/www.youtube.com\/embed\/|^http:\/\/www.youtube.com\/embed\//.test(youtube_link) ||
        youtube_link === null || youtube_link === "" || youtube_link === undefined )
        return next()
    else
        res.status(400).json({
            error: `youtube link must start as http(s)://www.youtube.com/embed/,` +
                ` youtube_link validation failed`
        })
}

const checkArtisteNameLength = (req, res, next) => {
    const { artiste_name } = req.body
    if (artiste_name === undefined || artiste_name.length <= 35)
        return next()
    else
        res.status(400).json({
            error: `artist name length must be <= 35,` +
                ` current length=${artiste_name.length},` +
                ` artist name length validation failed`
        })
}

const checkGenreLength = (req, res, next) => {
    const { genre } = req.body
    if (genre === undefined || genre.length <= 50)
        return next()
    else
        res.status(400).json({
            error: `genre length must be <= 50,` +
                ` current length=${genre.length},` +
                ` genre validation failed`
        })
}

const checkNationalityLength = (req, res, next) => {
    const { nationality } = req.body
    if (nationality === undefined || nationality.length <= 35)
        return next()
    else
        res.status(400).json({
            error: `nationality length must be <= 35,` +
                ` current length=${nationality.length},` +
                ` nationality validation failed`
        })
}

module.exports = {
    checkArtistes,
    checkArtisteIndex,
    checkArtisteName,
    checkIsFavoriteBoolean,
    checkIsNumberBirth,
    checkIsNumberDeath,
    checkWikiLink,
    checkYouTubeLink,
    checkArtisteNameLength,
    checkGenreLength,
    checkNationalityLength
}