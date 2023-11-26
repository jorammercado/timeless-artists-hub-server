const cors = require("cors")
const express = require("express")
const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
  res.send("Welcome to Timeless Artists Hub")
})

const artistesController = require("./controllers/artistesController.js")
app.use("/artistes", artistesController)
const artworksDirectController = require("./controllers/artworksDirectController.js")
app.use("/artworks", artworksDirectController)

app.get("*", (req, res) => {
    res.status(404).send("Page not found")
})

module.exports = app