const Koa = require('koa');
const IO = require('koa-socket');

const route = require('./middlewares/route');
const log = require('./middlewares/log');

const orderRoutes = require('./routes/order');

const app = new Koa()
const io = new IO({
  ioOptions: {
    pingTimeout: 10000,
    pingInterval: 5000,
  },
});

io.attach(app)
io.use(log())
io.use(route(
    app.io,
    app._io,
    Object.assign({}, orderRoutes)
  ))

app.io.on('connection', async (ctx) => {
  console.log(`  <<<< connection ${ctx.socket.id} ${ctx.socket.request.connection.remoteAddress}`);
  ctx.socket.emit('login', {
    id: ctx.socket.id
  })
});
app.io.on('disconnect', async (ctx) => {
  console.log(`  >>>> disconnect ${ctx.socket.id}`);
  
});

let port = 3002;
app.listen(port, () => console.log(`Socket start at ${port}...`));