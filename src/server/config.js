module.exports = {
  CONCURRENCY: process.env.WEB_CONCURRENCY || 1,
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 5000,
  TIMEOUT: 29000
};
