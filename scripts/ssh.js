const Client = require('ssh2').Client

class Authentication {
  constructor (username, password) {
    this.username = username
    this.password = password
  }

  username
  password
  privateKey

  set (key, value) {
    this[key] = value
  }
}

export default class SSHClient {
  constructor (host, port) {
    this.host = host
    this.port = port
  }

  host
  port
  username
  password
  privateKey
  connection = new Client()

  /**
   * 
   * @param {Authentication} authentication 用户登录信息
   */
  authenticate(authentication = new Authentication()) {
    const {username, password, privateKey} = authentication
    if(!username) {
      return Promise.reject(new Error('username is required!'))
    }
    this.username = username
    this.password = password
    this.privateKey = privateKey
    return new Promise((resolve, reject) => {
      this.connection.on('ready', function () {
        resolve(this.connection)
      }).on('error', function (err) {
        reject(err)
      }).connect({
        host: this.host,
        port: this.port,
        username: this.username,
        password: this.password,
        privateKey: this.privateKey
      })
    })
  }

  interactive () {
    return new Promise((resolve, reject) => {

      const conn = this.connection

      conn.shell(function (err, stream) {
        if(err) {
          return reject(err)
        }

        resolve(stream)
  
        stream.on('close', function () {
          process.stdin.pause()
          process.stdout.write('Connection closed!')
          conn.end()
        }).on('data', function (data) {
          process.stdin.pause()
          process.stdout.write(data)
          process.stdin.resume()
        }).stderr.on('data', function (data) {
          process.stderr.write(data)
        })
  
        process.stdin.on("data", (data) => {
          stream.stdin.write(data)
        })
  
        process.stdin.setRawMode(true)
      })
    })
  }
}