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

  const verificationToken = v4(); //для прода - раскоментить
  
  const hashPassword = await bcrypt.hash(password, 10); // хешування пароля
  const result = await dbUsers.create({
    ...req.body,
    password: hashPassword,
    name,
    city,
    phone,
    verifyEmail: false, // для прода - verifyEmail: false,
    verificationToken,  // для прода - verificationToken,
  }); // створення нового user в базі

  await sendVerifyMail(email, verificationToken, name); //для прода - раскоментить

  res.status(201).json({
    email: result.email,
    id: result._id,
  });
};

module.exports = registerUser;
