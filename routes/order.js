const assert = require('assert')

module.exports = {
  async login(ctx) {
    // 获取socket的传参
    const { userId } = ctx.data
    // 获取当前连接的id
    console.log(ctx.socket.socket.id);
    console.log(userId);
    // 获取当前的链接id
    let { id } = ctx.socket.socket
    // ctx._io.to(id).emit('loginEnd', id);
    ctx._io.to(id).emit('login', id);
    return { id }
  },
  async getNewOrder(ctx){
    const { shopId, type } = ctx.data
    // ctx.socket.broadcast.emit()
    console.log(`remind: ${shopId}`);
    // 广播已有新的订单
    ctx.socket.broadcast('newOrder', { shopId, type })
    return 
  }
}