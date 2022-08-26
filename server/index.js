"use strict";

const express = require('express');
const morgan = require('morgan');
const { getAllArticles, getArticleById } = require("./handlers");

const PORT = process.env.PORT || 3001;

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
    .use(morgan('tiny'))
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use('/', express.static(__dirname + '/'))

    // REST endpoints

    .get("/api/articles", getAllArticles)

    .get("/api/articles/id/:articleId", getArticleById)

    //Invalid route
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    .listen(PORT, () => console.info(`Listening on port ${PORT}`));