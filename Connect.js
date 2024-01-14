const mongoose = require("mongoose")

const connectDB = (uri) => {
    console.log("Connecting to Database...");
    return mongoose.connect(uri);
}

module.exports = connectDB