import { writeOnNthLine, clearNthLine } from './util.js'

module.exports = class Spinner {
  /**
   * 
   * @param {Function} stdout 
   * @param {Number} lineNumber 
   */
  constructor (stdout = process.stdout, lineNumber = 0) {
    this.current = 0
    this.prefix = ''
    this.lineNumber = lineNumber
    this.stdout = stdout
    this.delay = 60
    this.chars = Spinner.spinners[28].split('')
    this.text = ''
    this.id = null
  }

  stdout
  prefix
  current
  lineNumber
  delay
  chars
  text
  id

  static spinners = [
    '|/-\\',
    '⠂-–—–-',
    '◐◓◑◒',
    '◴◷◶◵',
    '◰◳◲◱',
    '▖▘▝▗',
    '■□▪▫',
    '▌▀▐▄',
    '▉▊▋▌▍▎▏▎▍▌▋▊▉',
    '▁▃▄▅▆▇█▇▆▅▄▃',
    '←↖↑↗→↘↓↙',
    '┤┘┴└├┌┬┐',
    '◢◣◤◥',
    '.oO°Oo.',
    '.oO@*',
    '🌍🌎🌏',
    '◡◡ ⊙⊙ ◠◠',
    '☱☲☴',
    '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
    '⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓',
    '⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆',
    '⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋',
    '⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁',
    '⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈',
    '⠁⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈⠈',
    '⢄⢂⢁⡁⡈⡐⡠',
    '⢹⢺⢼⣸⣇⡧⡗⡏',
    '⣾⣽⣻⢿⡿⣟⣯⣷',
    '⠁⠂⠄⡀⢀⠠⠐⠈'
  ]
  /**
   * 
   * @param {String} text 
   */
  setPrefix(prefix) {
    this.prefix = prefix
  }
  /**
   * 
   * @param {String} text 
   */
  setText(text) {
    this.text = text
  }
  start() {
    this.current = 0
    this.render()
  }
  render() {
    if (this.id) {
      clearTimeout(this.id)
    }
    let msg = `${this.prefix}${this.chars[this.current]} ${this.text}`
    const columns = typeof this.stdout.columns === 'number' ? this.stdout.columns : 100
    msg = msg.slice(0, columns)
    writeOnNthLine(this.stdout, this.lineNumber, msg)
    this.current = ++this.current % this.chars.length
    this.id = setTimeout(() => this.render(), this.delay)
  }
  stop() {
    if (this.id) {
      clearTimeout(this.id)
      this.id = null
    }
    clearNthLine(this.stdout, this.lineNumber)
  }
}