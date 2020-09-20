const inquirer = require('inquirer')
const SSHClient = require('../scripts/ssh').default

const promptList = [
  {
    type: 'input',
    message: 'Username: ',
    name: 'username',
    required: true,
    validate: function (answer) {
      if(!answer) {
        return false
      }
      return true
    }
  },
  {
    type: 'password',
    message: 'Password: ',
    name: 'password',
    required: true,
    validate: function (answer) {
      if(!answer) {
        return false
      }
      return true
    }
  }
]

module.exports = function () {
  function connect() {
    inquirer.prompt(promptList).then(async answer => {
      const sshClient = new SSHClient('127.0.0.1', 22)

      try {
        await sshClient.authenticate({
          username: answer.username,
          password: answer.password
        })

        await sshClient.interactive()
      } catch(err) {
        if(err.level === 'client-authentication') {
          process.stderr.write('The username/password is incorrect!\n')
          connect()
        }
      }
    })
  }

  connect()
}