const { dbNotice } = require("../models/notice");

const getAllNoticesByCategoryController = async (req, res, next) => {
  return res.status(200).json({ status: "true" });
};

const getOneNoticeByIdController = async (req, res, next) => {
  const { noticeId } = req.params;
  const notice = await dbNotice.findById(noticeId);
  res.status(200).json({ notice });
};

// Restricted routes
const addNoticeToFavoriteController = async (req, res, next) => {
  res.status(201).json({ status: "ok" });
};
const getFavoriteNoticesController = async (req, res, next) => {
  res.status(200).json({ status: "ok" });
};
const deleteNoticeFromFavoriteController = async (req, res, next) => {
  res.status(200).json({ status: "ok" });
};

const addNoticeByCategoryController = async (req, res, next) => {
  const notice = await dbNotice.create({ ...req.body, owner: 4444 });
  return res.status(201).json({ notice });
};
const getOwnNoticesController = async (req, res, next) => {
  res.status(200).json({ status: "ok" });
};
const deleteOwnNoticeController = async (req, res, next) => {
  res.status(200).json({ status: "ok" });
};

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
