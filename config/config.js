const mongoose = require("mongoose");
const { MONGO_URI } = require("./keys");



const dbConnection = async () => {
    const MONGO_URI = `mongodb+srv://victormacedodedeus1:y3ul7ehLjcnyabys@cluster0.yr2umvr.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Database connected succesfully");
    } catch (error) {
        console.error(error);
        throw new Error("Error connecting to database");
    }
};
module.exports = {
    dbConnection,

};