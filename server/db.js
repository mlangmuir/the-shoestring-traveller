require("dotenv").config();
const { MongoClient } = require("mongodb");

// get mongo uri from .env file
const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

let client = null;

const getDb = async () => {
    if (!client) {
        // creates a new client
        client = new MongoClient(MONGO_URI, options);
        await client.connect();
    }
    
    return client.db("travel-site");
}

module.exports = { getDb }