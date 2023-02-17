const createError = require("http-errors");
const { dbNotice } = require("../models/notice");

const getAllNoticesByCategoryController = async (req, res, next) => {
  const { category } = req.params;

  const notices = await dbNotice.find({ category });

  return res.status(200).json(notices);
};

const getOneNoticeByIdController = async (req, res, next) => {
  const { noticeId } = req.params;
  const notice = await dbNotice.findById(noticeId);

  if (!notice) {
    return next(createError(404, "Notfound"));
  }
  return res.status(200).json({ notice });
};

// Restricted routes
const addNoticeToFavoriteController = async (req, res, next) => {
  // TODO: Real user ID

  const userId = "63ede7848e4c3519b635f08b";
  if (!userId) {
    return next(createError(401, "Unathorized"));
  }

  const { noticeId } = req.params;
  const askedNotice = await dbNotice.findById(noticeId);
  if (!askedNotice) {
    return next(createError(404, "Not found"));
  }
  const { favoritesIn } = askedNotice;
  if (favoritesIn.includes(userId)) {
    return next(createError(409, "Already in favorites"));
  }
  const notice = await dbNotice.findByIdAndUpdate(
    noticeId,
    { favoritesIn: [...favoritesIn, userId] },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(201).json({ notice });
};

const getFavoriteNoticesController = async (req, res, next) => {
  const { _id } = req.user;

  if (!_id) {
    return next(createError(401, "Unathorized"));
  }

  const notices = await dbNotice.find({ favoritesIn: _id });

  return res.status(200).json({ notices });
};

const deleteNoticeFromFavoriteController = async (req, res, next) => {
  // TODO: Real user ID
  const userId = "63ede7848e4c3519b635f08b";
  if (!userId) {
    return next(createError(401, "Unathorized"));
  }

  const { noticeId } = req.params;
  const askedNotice = await dbNotice.findById(noticeId);

  if (!askedNotice) {
    return next(createError(404, "Not found"));
  }
  const { favoritesIn } = askedNotice;
  const updatedNotice = await dbNotice.findByIdAndUpdate(
    noticeId,
    { favoritesIn: favoritesIn.filter((id) => id !== userId) },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({ updatedNotice });
};

const addNoticeByCategoryController = async (req, res, next) => {
  // TODO: Real user ID
  const userId = "73ede7848e4c3519b635f08b";
  if (!userId) {
    return next(createError(401, "Unathorized"));
  }

  const notice = await dbNotice.create({ ...req.body, owner: userId });
  if (!notice) {
    return next(createError(400, "Creating error"));
  }
  return res.status(201).json({ notice });
};

const getOwnNoticesController = async (req, res, next) => {
  const { _id } = req.user;

  if (!_id) {
    return next(createError(401, "Unathorized"));
  }

  const notices = await dbNotice.find({ owner: _id });

  return res.status(200).json({ notices });
};

const deleteOwnNoticeController = async (req, res, next) => {
  const { _id } = req.user;

  const { noticeId } = req.params;

  if (!_id) {
    return next(createError(401, "Unathorized"));
  }

  const notice = await dbNotice.findById(noticeId);

  if (!notice) {
    return next(createError(404, `Not found notice by id: ${contactId}`));
  }

  const ownerIdString = notice.owner.toString();

  if (ownerIdString !== _id) {
    return next(createError(403, "Forbidden"));
  }

  await dbNotice.findByIdAndRemove(noticeId);

  return res.status(200).json({ message: "Notice deleted" });
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
