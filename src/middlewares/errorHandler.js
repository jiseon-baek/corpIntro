const errorMessages = require('../messages/errorMessages');

module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: errorMessages.serverError });
};
