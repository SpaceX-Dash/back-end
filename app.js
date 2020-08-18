const express = require("express")
const axios = require('axios')
const cors = require("cors")

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




const port = 3001
app.listen(port, () => {
    console.log("Listening on port 3001");
})

