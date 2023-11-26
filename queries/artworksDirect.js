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


module.exports = {
    getAllArtworksDirect,
    getOneArtworkDirect,
    deleteArtworkDirect
}