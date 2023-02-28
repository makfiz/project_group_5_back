const express = require("express");
const routerNotices = express.Router();

const { tryCatchWrapper } = require("../../helpers/index");
const { validateBody, validateParams } = require("../../middlewares/index");
const { schemaNoticesByCategory } = require("../../schemas/noticesByCategory");
const { createNoticeSchema } = require("../../schemas/createNoticeSchema");

const authIdent = require("../../middlewares/authIdent");
const { upload } = require("../../middlewares/uploadAvatar");

const {
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
  uploadNoticeImage,
} = require("../../controllers/notices.controller");

routerNotices.get(
  "/:category",
  validateParams(schemaNoticesByCategory),
  tryCatchWrapper(getAllNoticesByCategoryController)
);
routerNotices.get(
  "/:category/p",
  tryCatchWrapper(getAllNoticesByCategoryPaginatedController)
);
routerNotices.get(
  "/all/find",
  tryCatchWrapper(getAllNoticesBySearchController)
);
routerNotices.get("/id/:noticeId", tryCatchWrapper(getOneNoticeByIdController));
routerNotices.use(authIdent);
routerNotices.post(
  "/:noticeId/favorite",
  tryCatchWrapper(addNoticeToFavoriteController)
);
routerNotices.get(
  "/user/:userId/favorite",
  tryCatchWrapper(getFavoriteNoticesController)
);
routerNotices.delete(
  "/:noticeId/favorite",
  tryCatchWrapper(deleteNoticeFromFavoriteController)
);
routerNotices.post(
  "/:categoryName",
  validateBody(createNoticeSchema),
  tryCatchWrapper(addNoticeByCategoryController)
);
routerNotices.get(
  "/own/user/:userId",
  tryCatchWrapper(getOwnNoticesController)
);
routerNotices.delete(
  "/own/:noticeId",
  tryCatchWrapper(deleteOwnNoticeController)
);
routerNotices.patch(
  "/:noticeId/upload",
  authIdent,
  upload.single("img"),
  tryCatchWrapper(uploadNoticeImage)
);
module.exports = { routerNotices };
