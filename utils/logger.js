const log4js = require("log4js")

/**
 * 
 * @param {String} prefix logger placement 
 */
module.exports = (prefix) => {
  const logger = log4js.getLogger(prefix)
  logger.level = "debug"
  return logger
}