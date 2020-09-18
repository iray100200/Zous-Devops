import Spawn from './spawn'
import Spinner from '../utils/console/spinner-progress'

const spinner = new Spinner()

const dependencies = [
  'pm2',
  'nodemon'
]

export default async function () {
  spinner.start()
  spinner.setText('开始检查依赖...')

  const taskQueue = []

  await dependencies.forEach(async dep => {
    const next = await Spawn.runScript('npm list', {
      stdio: 'ignore'
    })
    if (!next) {
      taskQueue.push(dep)
    }
  })

  if (taskQueue.length > 0) {
    spinner.setText('开始安装依赖...')

  }
}