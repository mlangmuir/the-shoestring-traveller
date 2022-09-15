"use strict";

const express = require('express');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const morgan = require('morgan');
const path = require('path');
const {
    getAllArticles,
    getArticles,
    getArticleById,
    addFavourite,
    addReadLater,
    deleteFavourite,
    deleteReadLater,
    getFavouriteArticles,
    getReadLaterArticles,
    addComment,
    deleteComment,
    getCommentsByArticle,
    getCommentsByUser,
    addArticle,
    deleteArticle
} = require("./handlers");

const PORT = process.env.PORT || 3001;

const env = process.env.NODE_ENV || "development";

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: env === "development" ? 'http://localhost:3001' : "https://theshoestringtraveller.matthewlangmuir.com",
    clientID: 'q8LwvyfY11h98fQHjnHUsx9hP5IkU39I',
    issuerBaseURL: 'https://dev-3g52qn3j.us.auth0.com'
};

const app = express()

    app.use(function (req, res, next) {
    res.header(
        'Access-Control-Allow-Methods',
        'OPTIONS, HEAD, GET, PUT, POST, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );
    next();
    })
    // auth router attaches /login, /logout, and /callback routes to the baseURL
    app.use(auth(config))
    app.use(morgan('tiny'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: false }))
    // if (env === "development") {
    //     app.use('/', express.static(__dirname + '/'))
    // } else {
        // const clientDistPath = path.resolve(__dirname, '../client/build');
        // app.get('*', (req, res, next) => {
        //     if (req.path.startsWith('/api/')) {
        //     next();
    
        //     return;
        //     }
    
        //     res.sendFile(path.resolve(clientDistPath, 'index.html'));
        // });
        // app.use(express.static(clientDistPath))
    // }


    // USER endpoints

    // req.isAuthenticated is provided from the auth router
    // app.get('/', (req, res) => {
    //     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    // })

    // app.get('/loginServer', (req, res) => {
    //     const { login, password } = req.body;
    //     res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    // })

    app.get('/profile', requiresAuth(), (req, res) => {
        res.send(JSON.stringify(req.oidc.user));
    })

    app.get("/api/all-articles", getAllArticles)

    app.get("/api/articles", getArticles)

    app.get("/api/articles/id/:articleId", getArticleById)

    app.get("/api/article-comments/:articleId", getCommentsByArticle)

    app.get("/api/user-comments/:userId", getCommentsByUser)

    app.get("/api/favourites/:userId", getFavouriteArticles)

    app.get("/api/read-later/:userId", getReadLaterArticles)

    app.post("/api/add-favourite/:articleUserId", addFavourite)

    app.post("/api/add-read-later/:articleUserId", addReadLater)

    app.post("/api/add-comment/:articleId", addComment)

    app.delete("/api/delete-comment/:id", deleteComment)

    app.delete("/api/delete-favourite/:articleUserId", deleteFavourite)

    app.delete("/api/delete-read-later/:articleUserId", deleteReadLater)


    // ADMIN ENDPOINTS

    app.post("/api/add-article", addArticle)

    app.delete("/api/delete-article/:articleId", deleteArticle)

    //Invalid route
    // app.get("*", (req, res) => {
    //     res.status(404).json({
    //     status: 404,
    //     message: "This is obviously not what you are looking for.",
    //     });
    // })

    app.use(express.static('./public_html'))

    app.listen(PORT, () => console.info(`Listening on port ${PORT}`));