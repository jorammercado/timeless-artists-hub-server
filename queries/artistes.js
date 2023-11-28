const db = require(`../db/dbConfig.js`)

const getAllArtistes = async () => {
    try {
        const allArtistes = await db.any(`SELECT * FROM artistes`)
        return allArtistes
    }
    catch (err) {
        return { err: `${err}, sql query error - get all artistes` }
    }
}

const getOneArtiste = async (id) => {
    try {
        const oneArtiste = await db.one(`SELECT * FROM artistes WHERE id=$1`, id)
        return oneArtiste
    }
    catch (err) {
        return { err: `${err}, sql query error - get one artiste` }
    }
}

const deleteArtiste = async (id) => {
    try {
        const deletedArtiste = await db.one(
            `DELETE FROM artistes WHERE id=$1 RETURNING *`,
            id
        )
        return deletedArtiste
    }
    catch (err) {
        return { err: `${err}, sql query error - delete an artiste` }
    }
}

const createArtiste = async (artiste) => {
    try {
        const { artiste_name, birth_year, death_year, genre,
            nationality, bio, wikipedia_link, youtube_link, is_favorite } = artiste
        const newArtiste = await db.one(
            `INSERT INTO artistes(artiste_name, birth_year, death_year, genre,` +
            ` nationality, bio, wikipedia_link, youtube_link, is_favorite)` +
            ` VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
            [artiste_name, birth_year, death_year, genre,
                nationality, bio, wikipedia_link, youtube_link, is_favorite]
        )
        return newArtiste
    }
    catch (err) {
        return { err: `${err}, sql query error - create an artiste` }
    }
}

const updateArtiste = async (id, artiste) => {
    try {
        const { artiste_name, birth_year, death_year, genre,
            nationality, bio, wikipedia_link, youtube_link, is_favorite } = artiste
        const updatedArtiste = await db.one(
            `UPDATE artistes SET artiste_name=$1, birth_year=$2, death_year=$3,` +
            ` genre=$4, nationality=$5, bio=$6, wikipedia_link=$7, youtube_link=$8,` +
            ` is_favorite=$9 WHERE id=$10 RETURNING *`,
            [artiste_name, birth_year, death_year, genre,
                nationality, bio, wikipedia_link, youtube_link, is_favorite, id]
        )
        return updatedArtiste
    }
    catch (err) {
        return { err: `${err}, sql query error - update an artiste` }
    }
}

module.exports = {
    getAllArtistes,
    getOneArtiste,
    deleteArtiste,
    createArtiste,
    updateArtiste
}
