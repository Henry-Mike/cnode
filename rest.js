module.exports = {
    restify: function (prefix) {
        var prefix = prefix || '/api/';
        return async (ctx, next) => {
            let rpath = ctx.request.path
            if (rpath.startsWith(prefix)) {
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                try {
                    await next()
                } catch (e) {
                    console.log('Process API error...');
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: e.code,
                        message: e.message
                    }
                }
            } else {
                await next();
            }
        }
    },

    APIError: function (code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    }
}