const { getDb } = require('./db');

const getAllArticles = async (req, res) => {
    const db = await getDb();

    // get all articles from database
    let data = await db.collection("articles").find({}).toArray();

    (data.length > 0) ?
        // send data
        res.status(200).send({ status: 200, data: data }) :
        // send error message
        res.status(404).send({ status: 404, message: "Not found" })
};

const getArticleById = async (req, res) => {
    console.log('test')
    const db = await getDb();

    // get article id from req params

    console.log(req.params)
    const articleId = req.params.articleId;

    // getting item by id from database and store it in result
    const result = await db.collection("articles").findOne({ "id": articleId });

    // if result is null, show error otherwise show result's data
    result !== null ?
        res.status(200).send({ status: 200, data: result }) :
        res.status(404).send({ status: 404, articleId, message: "Invalid article id" })
};

module.exports = { getAllArticles, getArticleById };