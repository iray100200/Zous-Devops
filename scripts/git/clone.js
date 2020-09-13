const Git = require("nodegit")
const path = require('path')
const progressBar = require('../../utils/progress')
const logger = require('../../utils/logger')

const bar = progressBar()
const status = {
  readyState: 0
}

const Logger = logger('git clone')

/**
 * @description 克隆
 * @param {String} 仓库地址 
 * @param {*} dest 文件临时输出目录 default: __dirname
 */
export default function clone(repo, dest = path.resolve(process.cwd(), 'repo')) {
  Logger.debug('开始下载')
  status.readyState = 1
  try {
    Git.Clone(repo, dest, {
      fetchOpts: {
        callbacks: {
          certificateCheck: function (...args) {
            /**
             * TODO
             */
          },
          transferProgress: function (progress) {
            if(status.readyState === 1) {
              bar.start(progress.totalObjects(), 0)
              status.readyState = 2
            }
            bar.setTotal(progress.totalObjects())
            bar.update(progress.receivedObjects())
          }
        }
      }
    }).then(function (repository) {
      bar.update(bar.total)
      bar.stop()
      Logger.info('下载完成')
    }).catch((error) => {
      bar.stop()
      Logger.error('发生错误：', error.message)
    })
  } catch (error) {
    Logger.error(error.message)
  }
}