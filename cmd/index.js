#!/usr/bin/env node

require("@babel/register")

const inquirer = require('inquirer')
const { Command } = require('commander')
const program = new Command()
const fs = require('fs')
const packageJson = JSON.parse(fs.readFileSync('package.json'))
const Spawn = require('../scripts/spawn').default
const checkEnv = require('../scripts/checkEnv').default
const SSHClient = require('../scripts/ssh').default
program.version(packageJson.version)

const promptList = [
  {
    type: 'input',
    message: 'Test command: ',
    name: 'content',
    required: true,
    default: "npm --version",
    validate: function (answer) {
      if (!answer) {
        return false
      }
      return true
    } 
  }
]

program.command('ssh')
  .action(function () {
    const conn = new SSHClient('127.0.0.1', 2522)
    conn.connect()
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