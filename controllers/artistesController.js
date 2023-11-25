const express = require("express")
const artistes = express.Router()
const {
    getAllArtistes,
    getOneArtiste,
    deleteArtiste,
    createArtiste,
    updateArtiste
} = require("../queries/artistes")
const {
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
} = require("../validations/checkArtistes")

const artworksController = require("./artworksController.js")
artistes.use("/:artiste_id/artworks", artworksController)

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
                    if (a.birth_year < b.birth_year)
                        return -1
                    else if (a.birth_year > b.birth_year)
                        return 1
                    else
                        return 0
            })
            if (req.query.order === "asc" || req.query.order === "ascGen" ||
                req.query.order === "ascNa" || req.query.order === "ascBir")
                res.status(200).json(allArtistes)
            else if (req.query.order === "desc" || req.query.order === "descGen" ||
                req.query.order === "descNa" || req.query.order === "descBir")
                res.status(200).json(allArtistes.reverse())
            else
                res.status(400).json({ error: "Order query error in index path." })
        }
        else if (req.query.is_favorite) {
            if (req.query.is_favorite === "true") {
                allArtistes = allArtistes.filter(current => {
                    return current.is_favorite === true
                })
                res.status(200).json(allArtistes)
            }
            else if (req.query.is_favorite === "false") {
                allArtistes = allArtistes.filter(current => {
                    return current.is_favorite === false
                })
                res.status(200).json(allArtistes)
            }
            else
                res.status(400).json({ error: "Is favorite query error in index path." })
        }
        else
            res.status(200).json(allArtistes)
    }
    catch (error) {
        res.status(400).json({ error, typeInd: "Error in index controller path." })
    }
})

artistes.get("/:id", checkArtisteIndex, async (req, res) => {
    try {
        const { id } = req.params
        const artiste = await getOneArtiste(id)
        res.status(200).json(artiste)
    }
    catch (error) {
        res.status(400).json({ error, typeGet: "Error in show controller path" })
    }
})

artistes.delete("/:id", checkArtisteIndex, async (req, res) => {
    try {
        const { id } = req.params;
        const deletedArtiste = await deleteArtiste(id)
        if (deletedArtiste)
            res.status(200).json({ success: true, deletedArtiste })
        else
            res.status(404).json({ errorType: "Artiste not found." })

    } catch (error) {
        res.status(400).json({ error, typeDel: "Error in delete controller path" })
    }
})

artistes.post("/", checkArtisteName,
    checkIsFavoriteBoolean,
    checkIsNumberBirth,
    checkIsNumberDeath,
    checkWikiLink,
    checkYouTubeLink,
    checkArtisteNameLength,
    checkGenreLength,
    checkNationalityLength, async (req, res) => {
        try {
            const artiste = req.body;
            artiste.birth_year = !artiste.birth_year ? 0 : artiste.birth_year
            artiste.death_year = !artiste.death_year ? 0 : artiste.death_year
            artiste.genre = !artiste.genre ? "genre unknown" : artiste.genre
            artiste.nationality = !artiste.nationality ? "nationality unknown" : artiste.nationality
            artiste.bio = !artiste.bio ? "no bio provided" : artiste.bio
            artiste.wikipedia_link = !artiste.wikipedia_link ? 'https://www.wikipedia.org/wiki/' : artiste.wikipedia_link
            artiste.youtube_link = !artiste.youtube_link ? 'https://www.youtube.com/' : artiste.youtube_link
            artiste.is_favorite = !artiste.is_favorite ? false : artiste.is_favorite
            const artisteAdded = await createArtiste(artiste)
            res.status(200).json(artisteAdded)
        }
        catch (error) {
            res.status(400).json({ error, typeNew: "Error in new controller path" })
        }
    })

artistes.put("/:id", checkArtisteName,
    checkArtisteIndex,
    checkIsFavoriteBoolean,
    checkIsNumberBirth,
    checkIsNumberDeath,
    checkWikiLink,
    checkYouTubeLink,
    checkArtisteNameLength,
    checkGenreLength,
    checkNationalityLength, async (req, res) => {
        try {
            const { id } = req.params
            const artiste = req.body
            artiste.birth_year = !artiste.birth_year ? 0 : artiste.birth_year
            artiste.death_year = !artiste.death_year ? 0 : artiste.death_year
            artiste.genre = !artiste.genre ? "genre unknown" : artiste.genre
            artiste.nationality = !artiste.nationality ? "nationality unknown" : artiste.nationality
            artiste.bio = !artiste.bio ? "no bio provided" : artiste.bio
            artiste.wikipedia_link = !artiste.wikipedia_link ? 'https://www.wikipedia.org/wiki/' : artiste.wikipedia_link
            artiste.youtube_link = !artiste.youtube_link ? 'https://www.youtube.com/' : artiste.youtube_link
            artiste.is_favorite = !artiste.is_favorite ? false : artiste.is_favorite
            const updatedArtiste = await updateArtiste(id, artiste)
            if (updatedArtiste.id) {
                res.status(200).json(updatedArtiste)
            } else {
                res.status(400).json({ error: "Movie not found." })
            }
        }
        catch (error) {
            res.status(400).json({ error, typePut: "Error in update controller path" })
        }
    })


module.exports = artistes
