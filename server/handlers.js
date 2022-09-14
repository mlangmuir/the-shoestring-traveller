const { getDb } = require('./db');
const { v4: uuidv4 } = require('uuid');


// USER HANDLERS

const getAllArticles = async (req, res) => {

    const db = await getDb();

    try {
        // getting item by id from database and store it in result
        const result = await db.collection("articles").find({}).toArray();

        if (result) {
            res.status(200).send({ status: 200, data: result })
        } else {
            res.status(404).send({ status: 404, message: "Articles not found" })
        }
    } catch {
        res.status(500).send({ status: 500, message: "Error" })
    }
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
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sortKey = req.query.sortKey || "id";
    const sortDirection = req.query.sortDirection || -1;
    const findFilters = filters.length > 0 ? { $and: filters } : {};
    const findTitle = title ? { $text: { $search: title } } : {};
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

    try {
        // get article id from req params
        const articleId = req.params.articleId;

        // getting item by id from database and store it in result
        const result = await db.collection("articles").findOne({ "id": articleId });

        if (result) {
            res.status(200).send({ status: 200, data: result })
        } else {
            res.status(404).send({ status: 404, message: "Article not found" })
        }
    } catch {
        res.status(500).send({ status: 500, message: "Error" })
    }
};


const getFavouriteArticles = async (req, res) => {

    const db = await getDb();

    try {
        const data = await db.collection("favourites").find({ userId: req.params.userId }).toArray();

        // send data
        res.status(200).send({ data: data })
    } catch {
        // send error message
        res.status(500).send({ status: 500, message: "Error" })
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
        res.status(500).send({ status: 500, message: "Error" })
    }
};


const getCommentsByArticle = async (req, res) => {

    const db = await getDb();

    try {
        const data = await db.collection("comments").find({ articleId: req.params.articleId }).toArray();
        // send data
        res.status(200).send({ status: 200, data: data })
    } catch {
        // send error message
        res.status(500).send({ status: 500, message: "Error" })
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
        res.status(500).send({ status: 500, message: "Error" })
    }
};

const addFavourite = async(req, res) => {

    const db = await getDb();

    try {
        const result = await db.collection("favourites").insertOne({
            id: req.params.articleUserId,
            userId: req.body.userId,
            articleId: req.body.articleId,
            article: req.body.articleData
        });

        if (result) {
            res.status(201).json({ status: 201, message: "Added to Favourites" })
        } else {
            res.status(400).json({ status: 400, message: "An unknown error has occurred." })
        }
    } catch {
        // send error message
        res.status(500).json({ status: 500, message: "Error" });
    }
};

const addReadLater = async(req, res) => {

    const db = await getDb();

    try {
        const result = await db.collection("read-later").insertOne({
            id: req.params.articleUserId,
            userId: req.body.userId,
            articleId: req.body.articleId,
            article: req.body.articleData
        });

        if (result) {
            res.status(201).json({ status: 201, message: "Added to Read Later" })
        } else {
            res.status(400).json({ status: 400, message: "An unknown error has occurred." })
        }
    } catch {
        // send error message
        res.status(500).json({ status: 500, message: "Error" });
    }
};

const addComment = async(req, res) => {

    const db = await getDb();

    try {
        const result = await db.collection("comments").insertOne({
            id: uuidv4(),
            userId: req.body.userId,
            articleId: req.body.articleId,
            user: req.body.user,
            article: req.body.article,
            comment: req.body.comment,
            date: req.body.date
        });

        if (result) {
            res.status(201).json({ status: 201, message: "Added to Read Later" })
        } else {
            res.status(400).json({ status: 400, message: "An unknown error has occurred." })
        }
    } catch {
        // send error message
        res.status(500).json({ status: 500, message: "Error" });
    }
};

const deleteComment = async(req, res) => {

    const db = await getDb();

    try {
        const result = await db.collection("comments").deleteOne({ id: req.params.id });

        if (result) {
            res.status(201).json({ status: 201 , message: "Comment deleted" })
        } else {
            res.status(400).json({ status: 404, message: "Comment not found" });
        }
    } catch {
        // send error message
        res.status(500).json({ status: 500, message: "Error" });
    }
};

const deleteFavourite = async(req, res) => {

    const db = await getDb();

    try {
        const result = await db.collection("favourites").deleteOne({ id: req.params.articleUserId });

        if (result) {
            res.status(201).json({ status: 201 , message: "Deleted from Favourites" })
        } else {
            res.status(400).json({ status: 404, message: "Article not found" });
        }
    } catch {
        // send error message
        res.status(500).json({ status: 500, message: "Error" });
    }
};

const deleteReadLater = async(req, res) => {

    const db = await getDb();

    try {
        const result = await db.collection("read-later").deleteOne({ id: req.params.articleUserId });

        if (result) {
            res.status(201).json({ status: 201 , message: "Deleted from Read Later" })
        } else {
            res.status(400).json({ status: 404, message: "Article not found" });
        }
    } catch {
        res.status(500).json({ status: 500, message: "Error" });
    }
};


// ADMIN HANDLERS

const addArticle = async(req, res) => {

    const db = await getDb();

    try {
        const result = await db.collection("articles").insertOne({
            id: req.body.id,
            title: req.body.title,
            date: req.body.date,
            coverImgSrc: req.body.coverImgSrc,
            paragraphs: req.body.paragraphs,
            articleType: req.body.articleType,
            featured: req.body.featured,
            continent: req.body.continent,
            region: req.body.region,
            country: req.body.country
        });

        if (result) {
            res.status(201).json({ status: 201, message: "Added article successfully" })
        } else {
            res.status(400).json({ status: 400, message: "An unknown error has occurred." })
        }
    } catch {
        // send error message
        res.status(500).json({ status: 500, message: "Error" });
    }
};

const deleteArticle = async(req, res) => {

    const db = await getDb();

    try {
        const result = await db.collection("articles").deleteOne({ id: req.params.articleId });

        if (result) {
            res.status(201).json({ status: 201 , message: "Deleted article successfully" })
        } else {
            res.status(400).json({ status: 404, message: "Article not found" });
        }
    } catch {
        res.status(500).json({ status: 500, message: "Error" });
    }
};

module.exports = {
    getAllArticles,
    getArticles,
    getArticleById,
    getCommentsByArticle,
    getCommentsByUser,
    addFavourite,
    addReadLater,
    addComment,
    deleteComment,
    deleteFavourite,
    deleteReadLater,
    getFavouriteArticles,
    getReadLaterArticles,
    addArticle,
    deleteArticle
};