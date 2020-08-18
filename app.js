const express = require("express")

const app = express()

app.use(express.json())


app.get("/", (req, res) => {
    res.status(200).json({message: "Heeeeeeeeeello"})
})

const port = 3000
app.listen(port, () => {
    console.log("Listening on port 3000");
})