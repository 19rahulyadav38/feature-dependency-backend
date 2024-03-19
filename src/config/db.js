const mongoose = require("mongoose");

const connectDb =()=>{

    const connectionURL = process.env.DB_URL;

    mongoose.set("strictQuery", false);
    mongoose.connect(connectionURL)
    .then(()=>{
        console.log("Database connected successully");
    })
    .catch((error)=>{
        console.log("Error while connecting database: ", error)
    })
}

module.exports = connectDb;