const mongoose = require('mongoose');

// Connect to MongoDB using the connection string in the .env file
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI); // Connect to MongoDB usinng mongoose
        console.log(`MongoDB Connected To: ${connect.connection.host}`);

    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
