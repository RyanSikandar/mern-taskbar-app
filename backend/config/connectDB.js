const mongoose = require("mongoose")

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.mongoURL)
        console.log(`Mongo DB connected: ${connect.connection.host}`);
    }
    catch (error) {
        console.log(error)
        process.exit(1)
    }
}
module.exports = connectDB