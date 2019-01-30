const express = require("express")
const app = express()
const path = require("path")
const port = process.env.PORT || 3000

require("./server/config")
const bodyParser = require("body-parser")
const routes = require("./server/routes")

app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: false } ))
app.use(routes)

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(express.static(path.join(__dirname, "./client/build")))

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})

app.listen(port, () => console.log(`Listening on port ${port}`))
