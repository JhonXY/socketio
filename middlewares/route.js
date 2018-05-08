function noop() { }

/**
 * 路由处理
 * @param {IO} io koa socket io实例
 * @param {Object} routes 路由
 */
module.exports = function (io, _io, routes) {
  // 将配置型路由转化为io的on监听
  const router = Object.keys(routes).reduce((result, route) => {
    io.on(route, noop);
    result[route] = routes[route];
    return result;
  }, {});
  // 挂载所有on监听
  return async (ctx) => {
    if (router[ctx.event]) {
      const { event, data, socket } = ctx;
      ctx.res = await router[ctx.event]({
        event,
        data,
        socket,
        io,
        _io,
      });
    }
  };
};