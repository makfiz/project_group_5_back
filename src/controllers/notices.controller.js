const { dbNOtice } = require("../models/notice");

const getAllNoticesByCategoryController = async (req, res, next) => {};
const getOneNoticeByIdController = async (req, res, next) => {};

// Restricted routes
const addNoticeToFavoriteController = async (req, res, next) => {};
const getFavoriteNoticesController = async (req, res, next) => {};
const deleteNoticeFromFavoriteController = async (req, res, next) => {};
const addNoticeByCategoryController = async (req, res, next) => {};
const getOwnNoticesController = async (req, res, next) => {};
const deleteOwnNoticeController = async (req, res, next) => {};

module.exports = {
  getAllNoticesByCategoryController,
  getOneNoticeByIdController,
  addNoticeToFavoriteController,
  getFavoriteNoticesController,
  deleteNoticeFromFavoriteController,
  addNoticeByCategoryController,
  getOwnNoticesController,
  deleteOwnNoticeController,
};
