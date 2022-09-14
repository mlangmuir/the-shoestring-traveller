"use strict";

const express = require('express');
const { auth } = require('express-openid-connect');
const { requiresAuth } = require('express-openid-connect');
const morgan = require('morgan');
const {
    getArticles,
    getArticleById,
    addFavourite,
    addReadLater,
    deleteFavourite,
    deleteReadLater,
    getFavouriteArticles,
    getReadLaterArticles,
    addComment,
    getCommentsByArticle,
    getCommentsByUser,
    addArticle,
    deleteArticle
} = require("./handlers");

const PORT = process.env.PORT || 3001;

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: 'a long, randomly-generated string stored in env',
    baseURL: 'http://localhost:3001',
    clientID: 'q8LwvyfY11h98fQHjnHUsx9hP5IkU39I',
    issuerBaseURL: 'https://dev-3g52qn3j.us.auth0.com'
};

express()
    .use(function (req, res, next) {
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
    .use(auth(config))
    .use(morgan('tiny'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/', express.static(__dirname + '/'))

    
    // USER endpoints

    // req.isAuthenticated is provided from the auth router
    .get('/', (req, res) => {
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    })

    .get('/loginServer', (req, res) => {
        const { login, password } = req.body;
        res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
    })

    .get('/profile', requiresAuth(), (req, res) => {
        res.send(JSON.stringify(req.oidc.user));
    })

    .get("/api/articles", getArticles)

    .get("/api/articles/id/:articleId", getArticleById)

    .get("/api/article-comments/:articleId", getCommentsByArticle)

    .get("/api/user-comments/:userId", getCommentsByUser)

    .get("/api/favourites/:userId", getFavouriteArticles)

    .get("/api/read-later/:userId", getReadLaterArticles)

    .post("/api/add-favourite/:articleUserId", addFavourite)

    .post("/api/add-read-later/:articleUserId", addReadLater)

    .post("/api/add-comment/:articleId", addComment)

    .delete("/api/delete-favourite/:articleUserId", deleteFavourite)

    .delete("/api/delete-read-later/:articleUserId", deleteReadLater)


    // ADMIN ENDPOINTS

    .post("/api/add-article", addArticle)

    .delete("/api/delete-article/:articleId", deleteArticle)

    //Invalid route
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));