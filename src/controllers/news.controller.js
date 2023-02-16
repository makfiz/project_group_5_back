// const { dbUsers } = require('../models/user');
// const { Conflict, Unauthorized, NotFound } = require('http-errors');


async function getNews(req, res, next) {
    return res.status(200).json({massage: "news from JO"})
    } 
    module.exports = {
        getNews,
    };