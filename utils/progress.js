const cliProgress = require('cli-progress')

module.exports = () => new cliProgress.SingleBar({
  barsize: 100,
  hideCursor: true,
  format: '[{bar}] {percentage}% | {value}/{total}',
}, cliProgress.Presets.rect)