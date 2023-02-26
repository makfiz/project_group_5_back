const express = require('express');
const routerNotices = express.Router();

const { tryCatchWrapper } = require('../../helpers/index');
const { validateBody, validateParams } = require('../../middlewares/index');
const {
  schemaNoticesByCategory,
} = require('../../schemas/notices/noticesByCategory');
const {
  createNoticeSchema,
} = require('../../schemas/notices/createNoticeSchema');
const authIdent = require('../../middlewares/authIdent');
const { upload } = require('../../middlewares/uploadAvatar');

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
} = require('../../controllers/notices.controller');

// створити ендпоінт для отримання оголошень по категоріям
routerNotices.get(
  '/:category',
  validateParams(schemaNoticesByCategory),
  tryCatchWrapper(getAllNoticesByCategoryController)
);
// створити ендпоінт для отримання оголошень по категоріям + пагінація
routerNotices.get(
  '/:category/p',
  tryCatchWrapper(getAllNoticesByCategoryPaginatedController)
);
// створити ендпоінт для отримання оголошень за пошуком в title по ключовому слову
routerNotices.get(
  '/all/find',
  tryCatchWrapper(getAllNoticesBySearchController)
);
// створити ендпоінт для отримання одного оголошення
routerNotices.get('/id/:noticeId', tryCatchWrapper(getOneNoticeByIdController));
// Restricted routes
routerNotices.use(authIdent);
// створити ендпоінт для додавання оголошення до обраних
routerNotices.post(
  '/:noticeId/favorite',
  tryCatchWrapper(addNoticeToFavoriteController)
);
// створити ендпоінт для отримання оголошень авторизованого користувача доданих ним же в обрані
routerNotices.get(
  '/user/:userId/favorite',
  tryCatchWrapper(getFavoriteNoticesController)
);
// створити ендпоінт для видалення оголошення авторизованого користувача доданих цим же до обраних
routerNotices.delete(
  '/:noticeId/favorite',
  tryCatchWrapper(deleteNoticeFromFavoriteController)
);
// створити ендпоінт для додавання оголошень відповідно до обраної категорії
routerNotices.post(
  '/:categoryName',
  validateBody(createNoticeSchema),
  tryCatchWrapper(addNoticeByCategoryController)
);
// створити ендпоінт для отримання оголошень авторизованого кристувача створених цим же користувачем
routerNotices.get(
  '/own/user/:userId',
  tryCatchWrapper(getOwnNoticesController)
);
// створити ендпоінт для видалення оголошення авторизованого користувача створеного цим же користувачем
routerNotices.delete(
  '/own/:noticeId',
  tryCatchWrapper(deleteOwnNoticeController)
);

routerNotices.patch(
  '/:noticeId/upload',
  authIdent,
  upload.single('img'),
  tryCatchWrapper(uploadNoticeImage)
);
module.exports = { routerNotices };
