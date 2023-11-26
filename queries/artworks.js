const db = require("../db/dbConfig.js")

const getAllArtworks = async (artiste_id) => {
    try {
        const allArtworks = await db.any("SELECT * FROM artworks WHERE artiste_id=$1",
            artiste_id)
        return allArtworks
    }
    catch (err) {
        return { err, type: "sql query error - get all artworks" }
    }
}

const getOneArtwork = async (id) => {
    try {
        const oneArtwork = await db.any("SELECT * FROM artworks WHERE id=$1", id)
        return oneArtwork
    }
    catch (err) {
        return { err, type: " sql query error - get one artwork" }
    }
}

const deleteArtwork = async (id) => {
    try {
        const deletedArtwork = await db.one("DELETE FROM artworks WHERE id=$1 RETURNING *", id)
        return deletedArtwork
    } catch (error) {
        return error
    }
}

const createArtwork = async (artwork) => {
    try {
        const { artwork_name, artiste_name, style, date_created,
            img_link, isFavorite, artiste_id } = artwork
        const newArtwork = await db.one(`INSERT INTO artworks(artwork_name, artiste_name,` +
            ` style, date_created, img_link, is_favorite, artiste_id)` +
            ` VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [artwork_name, artiste_name, style, date_created,
                img_link, isFavorite, artiste_id]
        )
        return newArtwork
    } catch (err) {
        return { err, type: " sql query error - create an artwork" }
    }
}

const updateArtwork = async (id, artwork) => {
    try {
        const { artwork_name, style, date_created,
            img_link, is_favorite } = artwork
        const updatedArtwork = await db.one(`UPDATE artworks SET artwork_name=$1,` +
            ` style=$2, date_created=$3, img_link=$4, is_favorite=$5 WHERE id=$6 RETURNING *`,
            [artwork_name, style, date_created, img_link, is_favorite, id]
        );
        return updatedArtwork
    } catch (err) {
        return { err, type: " sql query error - updated an artwork" }
    }
}


module.exports = {
    getAllArtworks,
    getOneArtwork,
    deleteArtwork,
    createArtwork,
    updateArtwork
}