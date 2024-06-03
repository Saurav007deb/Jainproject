const express = require('express');
const router = express.Router();

router.post('/projectData', (req,res)=>{
    try {

        res.send([global.projectdata,global.locationData])
    } catch (error) {
        console.error(error.message);
        res.send("Server Error")
    }
})

module.exports = router;