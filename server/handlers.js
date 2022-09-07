const { getDb } = require('./db');

const getAllArticles = async (req, res) => {

    const db = await getDb();

    // get all articles from database
    const data = await db.collection("articles").find({}).toArray();

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
    splitContinent.forEach((item) => {
        if (item) {
            continentFilters.push({ "continent": item });
        }
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

    const country = req.query.country || "";
    const splitCountry = Array.isArray(country) === false ? [country] : country;
    const countryFilters = [];
    splitCountry.forEach((item) => {
        if (item) {
            countryFilters.push({ "country": item });
        }
    })
    if (countryFilters.length > 0) {
        filters.push({ $or: countryFilters });
    }

    const articleType = req.query.articleType || "";
    const splitArticleType = Array.isArray(articleType) === false ? [articleType] : articleType;
    const articleTypeFilters = [];
    splitArticleType.forEach((item) => {
        if (item) {
            articleTypeFilters.push({ "articleType": item });
        }
    })
    if (articleTypeFilters.length > 0) {
        filters.push({ $or: articleTypeFilters });
    }

    // setting page limit, page numbers and sorting type and direction
    const limit = req.query.limit || 15;
    const page = req.query.page || 1;
    const sortKey = req.query.sortKey || "id";
    const sortDirection = req.query.sortDirection || -1;
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

    // countDocuments method counts # of items coming from DB based on filters applied in "find" variable
    const itemCount = await db.collection("articles").countDocuments(find);
    // using distinct to return names of all categories and body locations
    const continents = await db.collection('articles').distinct('continent');
    const regions = await db.collection('articles').distinct('region');
    const countries = await db.collection('articles').distinct('country');
    const articleTypes = await db.collection('articles').distinct('articleType');

    res.status(200).send({
        page,
        pageCount: Math.ceil(itemCount / limit),
        itemCount,
        sortKey,
        sortDirection,
        continents,
        regions,
        countries,
        articleTypes,
        data,
    })
}

const getArticleById = async (req, res) => {

    const db = await getDb();

    // get article id from req params

    const articleId = req.params.articleId;

    // getting item by id from database and store it in result
    const result = await db.collection("articles").findOne({ "id": articleId });

    // if result is null, show error otherwise show result's data
    result !== null ?
        res.status(200).send({ status: 200, data: result }) :
        res.status(404).send({ status: 404, articleId, message: "Invalid article id" })
};

const getCommentsByArticle = async (req, res) => {

    const db = await getDb();

    try {
        const data = await db.collection("comments").find({ articleId: req.params.articleId }).toArray();
        // send data
        res.status(200).send({ status: 200, data: data })
    } catch {
        // send error message
        res.status(404).send({ status: 404, message: "Not found" })
    }
};

const getCommentsByUser = async (req, res) => {

    const db = await getDb();

    try {
        const data = await db.collection("comments").find({ userId: req.params.userId }).toArray();
        // send data
        res.status(200).send({ status: 200, data: data })
    } catch {
        // send error message
        res.status(404).send({ status: 404, message: "Not found" })
    }
};

const addFavourite = async(req, res) => {

    const db = await getDb();

    try {
        await db.collection("favourites").insertOne({
            id: req.params.articleUserId,
            userId: req.body.userId,
            articleId: req.body.articleId,
            article: req.body.articleData
        });

        res.status(201).json({ status: 201 , message: "Added to Favourites" })
    } catch {
        // send error message
        res.status(404).json({ status: 404, message: "Article not found" });
    }
};

const addReadLater = async(req, res) => {

    const db = await getDb();

    try {
        await db.collection("read-later").insertOne({
            id: req.params.articleUserId,
            userId: req.body.userId,
            articleId: req.body.articleId,
            article: req.body.articleData
        });

        res.status(201).json({ status: 201 , message: "Added to Read Later" })
    } catch {
        // send error message
        res.status(404).json({ status: 404, message: "Article not found" });
    }
};

const addComment = async(req, res) => {

    const db = await getDb();

    try {
        await db.collection("comments").insertOne({
            userId: req.body.userId,
            articleId: req.body.articleId,
            comment: req.body.comment,
            article: req.body.article
        });

        res.status(201).json({ status: 201 , message: "Comment added" })
    } catch {
        // send error message
        res.status(404).json({ status: 404, message: "Not found" });
    }
};

const deleteFavourite = async(req, res) => {

    const db = await getDb();

    try {
        await db.collection("favourites").deleteOne({ id: req.params.articleUserId });

        res.status(201).json({ status: 201 , message: "Deleted from Favourites" })
    } catch {
        // send error message
        res.status(404).json({ status: 404, message: "Article not found" });
    }
};

const deleteReadLater = async(req, res) => {

    const db = await getDb();

    try {
        await db.collection("read-later").deleteOne({ id: req.params.articleUserId });

        res.status(201).json({ status: 201 , message: "Deleted from Read Later" })
    } catch {
        // send error message
        res.status(404).json({ status: 404, message: "Article not found" });
    }
};

const getFavouriteArticles = async (req, res) => {

    const db = await getDb();

    try {
        const data = await db.collection("favourites").find({ userId: req.params.userId }).toArray();
        // send data
        res.status(200).send({ status: 200, data: data })
    } catch {
        // send error message
        res.status(404).send({ status: 404, message: "Not found" })
    }
};

const getReadLaterArticles = async (req, res) => {

    const db = await getDb();

    try {
        const data = await db.collection("read-later").find({ userId: req.params.userId }).toArray();
        // send data
        res.status(200).send({ status: 200, data: data })
    } catch {
        // send error message
        res.status(404).send({ status: 404, message: "Not found" })
    }
};

module.exports = { getAllArticles, getArticles, getArticleById, getCommentsByArticle, getCommentsByUser, addFavourite, addReadLater, addComment, deleteFavourite, deleteReadLater, getFavouriteArticles, getReadLaterArticles };