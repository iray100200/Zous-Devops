const Client = require('ssh2').Client
const inquirer = require('inquirer')
const readline = require('readline')
const conn = new Client()


export default class SSHClient {
  constructor (host, port) {
    this.host = host
    this.port = port
  }

  host
  port

  connect () {

    const promptList = [
      {
        type: 'input',
        message: 'Username: ',
        name: 'username',
        required: true,
        validate: function (answer) {
          if (!answer) {
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
          if (!answer) {
            return false
          }
          return true
        }
      }
    ]

    inquirer.prompt(promptList).then(answer => {
      conn.on('ready', function () {
        conn.shell(function (err, stream) {
          if (err) throw err

          stream.on('close', function () {
            process.stdout.write('Connection closed.')
            console.log('Stream :: close')
            conn.end()
          }).on('data', function (data) {
            process.stdin.pause()
            process.stdout.write(data)
            process.stdin.resume()
          }).stderr.on('data', function (data) {
            process.stderr.write(data)
          })

          process.on('SIGINT', function () {
            process.stdin.pause()
            process.stdout.write('\nEnding session\n')

            stream.end('exit\n')
          })

          process.stdin.on("data", (data) => {
            stream.stdin.write(data)
          })

          process.stdin.setRawMode(true)
        })
      }).connect({
        host: this.host,
        port: this.port,
        username: answer.username,
        password: answer.password
        // privateKey: require('fs').readFileSync('/here/is/my/key')
      })
    })
  }
}