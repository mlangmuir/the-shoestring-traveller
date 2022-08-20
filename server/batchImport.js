const { MongoClient } = require("mongodb");

require("dotenv").config();

const { MONGO_URI } = process.env;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

const articles = require("./articles.json");


const batchImport = async (req, res)=> {

    const client = new MongoClient(MONGO_URI, options);

    try {
        await client.connect();

        const db = client.db("travel-site");
        console.log("connected!");

        const result = await db.collection("articles").insertMany(articles);

        console.log("Success: ", result)

    } catch (err) {
        console.log("Error: ", err.stack);
    }

    client.close();
    console.log("disconnected!");
};

batchImport();