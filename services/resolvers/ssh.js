export default {
  Query: {
    hello: () => 'Hello world!',
    message: () => {
      return {
        id: 1,
        message: '123'
      }
    }
  }
}