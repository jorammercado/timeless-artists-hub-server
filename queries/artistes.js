const db = require("../db/dbConfig.js")

const getAllArtistes = async () => {
    try {
        const allArtistes = await db.any("SELECT * FROM artistes")
        return allArtistes
    }
    catch (error) {
        return { error, type: "sql query error - get all artistes" }
    }
}

const getOneArtiste = async (id) => {
    try {
      const oneArtiste = await db.one("SELECT * FROM artistes WHERE id=$1", id)
      return oneArtiste
    } catch (error) {
      return { error, type: " sql query error - get one artiste" }
    }
  }





module.exports = {
    getAllArtistes,
    getOneArtiste
}
