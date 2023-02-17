const { HttpError } = require("../../helpers/httpError");
const { dbUsers } = require("../../models/user");

async function updateUser(req, res, next) {
  const { _id } = req.user;

  const result = await dbUsers.findByIdAndUpdate(_id, req.body, { new: true });
  if (!result) {
    next(HttpError(404, "Not found"));
  }
  res.json({
    _id: result._id,
    name: result.name,
    email: result.email,
    birthday: result.birthday,
    phone: result.phone,
    city: result.city,
  });
}

module.exports = updateUser;
