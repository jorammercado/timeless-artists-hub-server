const db = require("../db/dbConfig.js")

const getAllArtworks = async (artiste_id) => {
    try{
        const allArtworks = await db.any("SELECT * FROM artworks WHERE artiste_id=$1",
        artiste_id)
        return allArtworks
    }
    catch (err) {
        return { err, type: "sql query error - get all artworks" }
    }
}

const getOneArtwork = async (id) => {
    try{
        const oneArtwork = await db.any("SELECT * FROM artworks WHERE id=$1",id)
        return oneArtwork
    }
    catch (err) {
        return { err, type: " sql query error - get one artwork" }
    }
}

module.exports = {
    getAllArtworks,
    getOneArtwork
}