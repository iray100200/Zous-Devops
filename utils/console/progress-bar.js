import { clearLine, toStartOfLine } from './util.js'

module.exports = class ProgressBar {
  /**
   * 
   * @param {Number} total 
   * @param {Function} stdout 
   * @param {Function} callback 
   */
  constructor (total, stdout = process.stderr, callback) {
    this.stdout = stdout
    this.total = total
    this.chars = ProgressBar.bars[0]
    this.delay = 60
    this.curr = 0
    this._callback = callback
    clearLine(stdout)
  }

  stdout
  curr
  total
  width
  chars
  delay
  id
  _callback

  static bars = [['#', '-']]

  tick() {
    if (this.curr >= this.total) {
      return
    }

    this.curr++

    if (!this.id) {
      this.id = setTimeout(() => this.render(), this.delay)
    }
  }

  cancelTick() {
    if (this.id) {
      clearTimeout(this.id)
      this.id = null
    }
  }

  stop() {
    this.curr = this.total

    this.cancelTick()
    clearLine(this.stdout)
    if (this._callback) {
      this._callback(this)
    }
  }

  render() {
    this.cancelTick()
    let ratio = this.curr / this.total
    ratio = Math.min(Math.max(ratio, 0), 1)

    let bar = ` ${this.curr}/${this.total}`
    const availableSpace = Math.max(0, this.stdout.columns - bar.length - 3)
    const width = Math.min(this.total, availableSpace)
    const completeLength = Math.round(width * ratio)
    const complete = this.chars[0].repeat(completeLength)
    const incomplete = this.chars[1].repeat(width - completeLength)
    bar = `[${complete}${incomplete}]${bar}`

    toStartOfLine(this.stdout)
    this.stdout.write(bar)
  }
}