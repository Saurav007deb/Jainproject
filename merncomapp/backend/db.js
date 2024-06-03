const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://contactdeb07:4k7wVF1Xgk2DbTpW@cluster0.clvepvy.mongodb.net/MerncomDB?retryWrites=true&w=majority&appName=Cluster0"


const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");

        
        const projectDataCollection = mongoose.connection.db.collection("ProjectData");
        const projectData = await projectDataCollection.find({}).toArray();

        const locationCollection = mongoose.connection.db.collection("Locations");
        const locationData = await locationCollection.find({}).toArray();

        global.projectdata = projectData;
        global.locationData = locationData;
        
     
        

    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit with failure
    }

   

};


module.exports = connectDB;




