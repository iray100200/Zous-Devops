import spawn from 'cross-spawn'
import Task from './task'

class Spawn extends Task {
  /**
   * 
   * @param {String} cmd 
   * @param {Array} args 
   * @param {Object} opts 
   */
  constructor (cmd, args, opts = {
    stdio: 'inherit'
  }) {
    super()
    this.cmd = cmd
    this.args = args
    this.opts = opts
  }

  cmd
  args
  opts

  static runScript (script, opts) {
    const [cmd, ...args] = script.split(/\s/g)
    const spawn = new Spawn(cmd, args, opts)
    return spawn.run()
  }

  run () {
    if (!(this.opts.stdio === 'ignore')) {
      console.log(`Executing: ${this.cmd} ${this.args && this.args.join(' ')} @path: ${process.cwd()}`)
    }
    const rs = spawn.sync(this.cmd, this.args, { stdio: "inherit", shell: true, ...this.opts })
    if (rs.status === 0) return Promise.resolve(true)
    return Promise.resolve(false)
  }
}

export default Spawn
