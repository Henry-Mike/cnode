module.exports = {
    'GET /': async (ctx, next) => {
        ctx.render('index.html');
    },

    'GET /topic/:id': async (ctx, next) => {
        let id = ctx.params.id;
        ctx.render('topic.html', id=id);
    }
}