const db = require("../db/dbConfig.js")

const getAllArtistes = async () => {
    try {
        const allArtistes = await db.any("SELECT * FROM artistes")
        return allArtistes
    }
    catch (error) {
        return { error, type: "query error" }
    }
}





module.exports = {
    getAllArtistes
}
