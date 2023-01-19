const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, printf } = format;
const path = require("path");

const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level.toUpperCase()}: ${message}`;
});

const logger = function (modulee) {

  var log=createLogger({
    format: combine(label({ label: modulee }), timestamp(), myFormat),
    transports: [new transports.Console()],
  });
  return log
};

module.exports = {logger};
