const db = require("../db/dbConfig.js")

const getAllArtistes = async () => {
    try {
        const allArtistes = await db.any("SELECT * FROM artistes")
        return allArtistes
    }
    catch (err) {
        return { err, type: "sql query error - get all artistes" }
    }
}

const getOneArtiste = async (id) => {
    try {
      const oneArtiste = await db.one("SELECT * FROM artistes WHERE id=$1", id)
      return oneArtiste
    } catch (err) {
      return { err, type: " sql query error - get one artiste" }
    }
  }

  const deleteArtiste = async (id) => {
    try {
      const deletedArtiste = await db.one(
        "DELETE FROM artistes WHERE id=$1 RETURNING *",
        id
      )
      return deletedArtiste
    } catch (err) {
      return { err, type: " sql query error - delete an artiste" }
    }
  };





module.exports = {
    getAllArtistes,
    getOneArtiste,
    deleteArtiste
}
