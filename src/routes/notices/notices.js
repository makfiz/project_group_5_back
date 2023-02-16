const express = require("express");
const router = express.Router();

const {
  getAllNoticesByCategoryController,
  getOneNoticeByIdController,
  addNoticeToFavoriteController,
  getFavoriteNoticesController,
  deleteNoticeFromFavoriteController,
  addNoticeByCategoryController,
  getOwnNoticesController,
  deleteOwnNoticeController,
} = require("../../controllers/notices.controller");

// створити ендпоінт для отримання оголошень по категоріям
router.get("/:categoryName", getAllNoticesByCategoryController);
// створити ендпоінт для отримання одного оголошення
router.get("/:categoryName/:noticeId", getOneNoticeByIdController);

// Restricted routes
// створити ендпоінт для додавання оголошення до обраних
router.post("/:noticeId/favorite", addNoticeToFavoriteController);
// створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
router.get("/favorite", getFavoriteNoticesController);
// створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних
router.delete("/:noticeId/favorite", deleteNoticeFromFavoriteController);
// створити ендпоінт для додавання оголошень відповідно до обраної категорії
router.post("/:categoryName", addNoticeByCategoryController);
// створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем
router.get("/own", getOwnNoticesController);
// створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем
router.delete("/own/:noticeId", deleteOwnNoticeController);

module.exports = router;
