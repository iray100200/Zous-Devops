export default class Task {
  constructor () {
    
  }

  promise

  catch (error) {
    this.promise = Promise.reject(error)
  }
  done () {
    this.promise = Promise.resolve()
  }
}