const { getAllArtworks } = require("../queries/artworks")
const { getAllArtistes } = require("../queries/artistes")

const checkArtworks = async (req, res, next) => {
    const { artiste_id } = req.params
    const allArtworks = await getAllArtworks(artiste_id)
    if(allArtworks[0]){
        return next()
    }
    else{
        res.status(500).json({ error: "server error in getAllArtworks, list validation failed" })
    }
}

const checkArtisteIndex = async (req, res, next) => {
    const allArtistes = await getAllArtistes()
    const { artiste_id } = req.params
    const ids = allArtistes.map(e => e.id)
    if (ids.includes(Number(artiste_id)))
        return next()
    else
        res.status(400).json({ error: "server error in checkArtisteIndex, id validation failed" })
}

const checkArtworkIndex = async (req, res, next) =>{
    const { artiste_id, id } = req.params
    const allArtworks = await getAllArtworks(artiste_id)
    const ids = allArtworks.map(e => e.id)
    if(ids.includes(Number(id)))
        return next()
    else
        res.status(400).json({ error: "server error in checkArtworkIndex, id validation failed for artworks" })
}

module.exports = { checkArtworks,
    checkArtisteIndex,
    checkArtworkIndex
}
