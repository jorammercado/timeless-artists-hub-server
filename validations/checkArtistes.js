const { getAllArtistes } = require("../queries/artistes")

const checkArtistes = async (req, res, next) => {
    const allArtistes = await getAllArtistes()
    if (allArtistes[0]) {
        return next()
    }
    else {
        res.status(500).json({ error: "server error in getAllArtistes, validation failed " })
    }
}

module.exports = { checkArtistes }