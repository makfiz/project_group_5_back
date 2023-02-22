const { dbUsers } = require("../../models/user");
const { HttpError } = require("../../helpers/httpError");
const { sendVerifyMail } = require("../../helpers/sendVerifyMail");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const registerUser = async (req, res) => {
  const { email, password, name, city, phone } = req.body;
  const user = await dbUsers.findOne({ email }); // Перевірка на наявність такого email в базі, агументом до методу create() - повинен бути об'єкт
  if (user) {
    throw new HttpError(409, `Email ${email} in use`);
  }

  const verificationToken = v4();
  await sendVerifyMail(email, verificationToken);

  const hashPassword = await bcrypt.hash(password, 10); // хешування пароля
  const result = await dbUsers.create({
    ...req.body,
    password: hashPassword,
    name,
    city,
    phone,
    verify: false,
    verificationToken,
  }); // створення нового user в базі
  res.status(201).json({
    email: result.email,
  });
};

module.exports = registerUser;
