const { dbNews } = require('../models/news');

async function getNews(req, res, next) {
  const { search } = req.query;

  const news = await dbNews.find().sort({ date: -1 });
  if (!search) {
    return res.status(200).json(news);
  } else {
    const filtred = news.filter(e => e.title.includes(search));
    return res.status(200).json(filtred);
  }
}

module.exports = {
  getNews,
};
