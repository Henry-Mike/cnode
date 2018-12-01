const Koa = require('koa');

const bodyParser = require('koa-bodyparser');

const staticFiles = require('./static-files');

const rest = require('./rest');

const templating = require('./templating');

const controller = require('./controller');

const app = new Koa();

app.use(async(ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}`);
    await next();
})

app.use(staticFiles('/static/', __dirname + '/static'));

app.use(bodyParser());

app.use(rest.restify('/api/'));
 
app.use(templating('views', {
    watch: true,
    noCache: true
}));

app.use(controller('/controllers/'));

app.listen(8080);

console.log('app started on port 8080');