const Koa = require('koa');
const Router = require('koa-router');
const cors = require('kcors');
const send = require('koa-send');
const compress = require('koa-compress');
const serve = require('koa-static');
const zlib = require('zlib');
const nba = require('nba');
const players = require('nba/data/players.json');

const app = new Koa();
const router = new Router();

app.use(serve('./build'));

app.use(compress({
  filter: contentType => /text/i.test(contentType),
  threshold: 2048,
  flush: zlib.Z_SYNC_FLUSH,
}));

app.use(cors());

// x-repsonse time
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

// logging
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}`);
});

router.get('/players', (ctx, next) => {
  ctx.body = players;
  return next();
});

function getPlayerDetails(PlayerID) {
  try {
    return nba.stats.playerInfo({ PlayerID });
  } catch (err) {
    console.error(err);
  }
}

function getPlayerShots(PlayerID) {
  try {
    return nba.stats.shots({ PlayerID });
  } catch (err) {
    console.error(err);
  }
}

router
  .param('playerId', (playerId, ctx, next) => {
    ctx.state.playerId = playerId;
    if (!ctx.state.playerId) {
      ctx.status = 404;
      return ctx.status;
    }
    return next();
  })
  .get('/player-details/:playerId', async (ctx) => {
    await getPlayerDetails(ctx.state.playerId)
      .then((data) => {
        ctx.body = data;
      });
  })
  .get('/player-shots/:playerId', async (ctx) => {
    await getPlayerShots(ctx.state.playerId)
      .then((data) => {
        ctx.body = data;
      });
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx) => {
  await send(ctx, ctx.path, { root: `${__dirname}/build` });
});

app.listen(8080, () => console.log('app starting on port 8080'));
