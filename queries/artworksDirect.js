const db = require("../db/dbConfig.js")

const getAllArtworksDirect = async () => {
    try {
        const allArtworks = await db.any("SELECT * FROM artworks")
        return allArtworks
    }
    catch (err) {
        return { err, type: "sql query error - get all artworks Direct" }
    }
}

const getOneArtworkDirect = async (id) => {
    try {
        const oneArtwork = await db.any("SELECT * FROM artworks WHERE id=$1", id)
        return oneArtwork
    }
    catch (err) {
        return { err, type: " sql query error - get one artwork Direct" }
    }
}

const deleteArtworkDirect = async (id) => {
    try {
        const deletedArtwork = await db.one("DELETE FROM artworks WHERE id=$1 RETURNING *", id)
        return deletedArtwork
    } catch (err) {
        return { err, type: " sql query error - delete one artwork Direct" }
    }
}

const updateArtworkDirect = async (id, artwork) => {
    try {
        const { artwork_name, style, date_created,
            img_link, is_favorite } = artwork
        const updatedArtwork = await db.one(`UPDATE artworks SET artwork_name=$1,` +
            ` style=$2, date_created=$3, img_link=$4, is_favorite=$5 WHERE id=$6 RETURNING *`,
            [artwork_name, style, date_created, img_link, is_favorite, id]
        );
        return updatedArtwork
    } catch (err) {
        return { err, type: " sql query error - updated an artwork - direct" }
    }
}

module.exports = {
    getAllArtworksDirect,
    getOneArtworkDirect,
    deleteArtworkDirect,
    updateArtworkDirect
}