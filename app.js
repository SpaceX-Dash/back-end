const express = require("express")
const axios = require('axios')
const cors = require("cors")
const { json } = require("express")

const app = express()



app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.status(200).json({message: "Heeeeeeeeeello"})
})

// Create Next Launch Route
app.get("/nextLaunch", (req, res) => {
    axios.get('https://api.spacexdata.com/v3/launches/next')
        .then(response => {
            const {flight_number, mission_name, launch_date_local, details} = response.data;
            const rocket = {}
            const launchsite = {}
            rocket.rocket_name = response.data.rocket.rocket_name;
            launchsite.site_name = response.data.launch_site.site_name;

            const payload = { 
                flight_number, 
                mission_name, 
                launch_date_local, 
                details,
                rocket,
                launchsite
            }
            
            console.log('MY PAYLOAD...\n', payload);
            res.status(200).json(payload);
        })
        .catch(err => console.log(err));
    
    /* Data to extract
        flight_number : string
        mission_name : string
        launch_date_local : string
        rocket  { : object 
            rocket_name : string     
        }
        launch_site {
            site_name: string
        }
        details: "string"
    */
})

app.get('/pastLaunches/:limit', (req, res) => {
    let limit; 
    if(req.params.limit && Number.parseInt(req.params.limit)) {
        limit = parseInt(req.params.limit);
    } else {
        limit = 5;
    }
    console.log("LIMIT IS", limit);
    axios.get(`https://api.spacexdata.com/v3/launches/past?id=true&limit=${limit}&sort=flight_number&order=desc`)
        .then(response => {
            const payload = response.data;
            res.status(200).json(payload);
        })
        .catch(err => res.status(500).json({"message": "INTERNAL SERVER ERROR"}));
})




const port = 3001
app.listen(port, () => {
    console.log("Listening on port 3001");
})

