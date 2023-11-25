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

module.exports = {
    getAllArtworks
}