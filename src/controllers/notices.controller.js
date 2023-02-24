const createError = require("http-errors");
const { dbNotice } = require("../models/notice");
const { dbUsers } = require("../models/user");

const getAllNoticesByCategoryController = async (req, res, next) => {
  const { category } = req.params;
  const notices = await dbNotice.find({ category });
  return res.status(200).json({ notices });
};

const getAllNoticesByCategoryPaginatedController = async (req, res, next) => {
  const { category } = req.params;
  const { page = 1, limit = 20, search } = req.query;
  const pageLimit = +limit > 20 ? 20 : +limit;
  const skip = +limit * +page - +limit;

  const notices = await dbNotice
    .find({ category, title: { $regex: new RegExp(search, "i") } })
    .skip(skip)
    .limit(pageLimit)
    .sort({ updatedAt: -1 });

  const totalCount = await dbNotice
    .find({ category, title: { $regex: new RegExp(search, "i") } })
    .count();
  const totalPages = Math.ceil(totalCount / limit);

  return res.status(200).json({ notices, page: +page, totalPages, totalCount });
};

const getAllNoticesBySearchController = async (req, res, next) => {
  const { page = 1, limit = 20, search } = req.query;
  const pageLimit = +limit > 20 ? 20 : +limit;
  const skip = +limit * +page - +limit;

  const notices = await dbNotice
    .find({ title: { $regex: new RegExp(search, "i") } })
    .skip(skip)
    .limit(pageLimit)
    .sort({ updatedAt: -1 });
  return res.status(200).json({ notices });
};

const getOneNoticeByIdController = async (req, res, next) => {
  const { noticeId } = req.params;

  const notice = await dbNotice.findById(noticeId);
  if (!notice) {
    return next(createError(404, "Notfound"));
  }

  const contacts = await dbUsers.findById(notice.owner, {
    _id: 0,
    email: 1,
    phone: 1,
  });

  return res.status(200).json({ notice, contacts });
};

// Restricted routes
const addNoticeToFavoriteController = async (req, res, next) => {
  const { _id: userId } = req.user;
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
    return next(createError(400, "Already in favorites"));
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
  const { search } = req.query;
  const { _id } = req.user;

  if (!_id) {
    return next(createError(401, "Unathorized"));
  }

  const notices = await dbNotice.find({
    favoritesIn: _id,
    title: { $regex: new RegExp(search, "i") },
  });

  return res.status(200).json({ notices });
};

const deleteNoticeFromFavoriteController = async (req, res, next) => {
  const { _id: userId } = req.user;
  if (!userId) {
    return next(createError(401, "Unathorized"));
  }

  const { noticeId } = req.params;
  const askedNotice = await dbNotice.findById(noticeId);

  if (!askedNotice) {
    return next(createError(404, "Not found"));
  }

  const { favoritesIn } = askedNotice;
  const notice = await dbNotice.findByIdAndUpdate(
    noticeId,
    {
      favoritesIn: favoritesIn.filter(
        (id) => id.toString() !== userId.toString()
      ),
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({ notice });
};

const addNoticeByCategoryController = async (req, res, next) => {
  const { _id: userId } = req.user;
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
  const { search } = req.query;
  const { _id } = req.user;

  if (!_id) {
    return next(createError(401, "Unathorized"));
  }

  const notices = await dbNotice.find({
    owner: _id,
    title: { $regex: new RegExp(search, "i") },
  });

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
    return next(createError(404, `Not found notice by id: ${noticeId}`));
  }

  const ownerIdString = notice.owner.toString();

  if (ownerIdString !== _id.toString()) {
    return next(createError(403, "Forbidden"));
  }

  await dbNotice.findByIdAndRemove(noticeId);
  return res.status(200).json({ message: "Notice  deleted", noticeId });
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
  getAllNoticesByCategoryPaginatedController,
  getAllNoticesBySearchController,
};
