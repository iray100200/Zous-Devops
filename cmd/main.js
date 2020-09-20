const inquirer = require('inquirer')
const { Command } = require('commander')
const program = new Command()
const fs = require('fs')
const packageJson = JSON.parse(fs.readFileSync('package.json'))
const Spawn = require('../scripts/spawn').default
const checkEnv = require('../scripts/checkEnv').default
const ssh = require('./ssh')
const Spinner = require('../utils/console/spinner-progress')
program.version(packageJson.version)

const promptList = [
  {
    type: 'input',
    message: 'Test command: ',
    name: 'content',
    required: true,
    default: "npm --version",
    validate: function (answer) {
      if(!answer) {
        return false
      }
      return true
    }
  }
]

program.command('spinner')
  .action(function () {
    const spinner = new Spinner()
    spinner.setText('running...')
    spinner.start()
  })

program.command('ssh')
  .action(function () {
    ssh()
  })

program
  .command('test')
  .action(function () {
    inquirer.prompt(promptList).then(answer => {
      Spawn.runScript(answer.content)
    })
  })

program.command('env')
  .action(function () {
    checkEnv()
  })

program.parse(process.argv)