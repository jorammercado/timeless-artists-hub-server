const express = require("express")
const artworks = express.Router({ mergeParams: true })
const { getOneArtiste } = require("../queries/artistes")






module.exports = artworks