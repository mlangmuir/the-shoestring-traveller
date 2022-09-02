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

const getArticles = async (req, res) => {

    const db = await getDb();

    const filters = [];

    const title = req.query.title || "";

    // uses query params sent by frontend and pushes string into array to be used as filters
    const continent = req.query.continent || "";
    const splitContinent = Array.isArray(continent) === false ? [continent] : continent;
    const continentFilters = [];
    splitContinent.filter(item => !!item).forEach((item) => {
        continentFilters.push({ "continent": item });
    })
    if (continent.length > 0) {
        filters.push({ $or: continentFilters });
    }

    const region = req.query.region || "";
    const splitRegion = Array.isArray(region) === false ? [region] : region;
    const regionFilters = [];
    splitRegion.forEach((item) => {
        if (item) {
            regionFilters.push({ "region": item });
        }
    })
    if (regionFilters.length > 0) {
        filters.push({ $or: regionFilters });
    }

    // setting page limit, page numbers and sorting type and direction
    const limit = req.query.limit || 15;
    const page = req.query.page || 1;
    const sortKey = req.query.sortKey || "id";
    const sortDirection = req.query.sortDirection || 1;
    const findFilters = filters.length > 0 ? { $and: filters } : {};
    const findTitle = title ? { title: { $regex: RegExp(title.toLowerCase()) } } : {};
    const find = { ...findFilters, ...findTitle };

    // gets items collection from DB (only filtered ones as defined in "find" variable and determines sorting, page # and limit)
    let data = await db.collection("articles")
        .find(find)
        .sort({
            [sortKey]: sortDirection
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray();

    console.log('data', data)

    // countDocuments method counts # of items coming from DB based on filters applied in "find" variable
    const itemCount = await db.collection("articles").countDocuments(find);
    // using distinct to return names of all categories and body locations
    const continents = await db.collection('articles').distinct('continent');
    const regions = await db.collection('articles').distinct('region');
    const countries = await db.collection('articles').distinct('country');

    res.status(200).send({
        page,
        pageCount: Math.ceil(itemCount / limit),
        itemCount,
        sortKey,
        sortDirection,
        continents,
        regions,
        countries,
        data,
    })
}

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

module.exports = { getAllArticles, getArticles, getArticleById };