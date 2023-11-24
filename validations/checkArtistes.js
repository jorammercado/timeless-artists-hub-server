const { getAllArtistes } = require("../queries/artistes")

const checkArtistes = async (req, res, next) => {
    const allArtistes = await getAllArtistes()
    if (allArtistes[0]) {
        return next()
    }
    else {
        res.status(500).json({ error: "server error in getAllArtistes, list validation failed " })
    }
}

const checkArtisteIndex = async (req, res, next) =>{
    const allArtistes = await getAllArtistes()
    const {id} = req.params
    const ids = allArtistes.map(e => e.id)
    if(ids.includes(Number(id)))
        return next()
    else
        res.status(404).json({ error: "server error in checkArtisteIndex, id validation failed " })
}

module.exports = { checkArtistes, 
                   checkArtisteIndex }