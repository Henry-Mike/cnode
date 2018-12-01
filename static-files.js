const fs = require('mz/fs');
const mime = require('mime');
const path = require('path');

module.exports = (prefix, dir) => {
    var prefix = prefix || '/static/';
    return async (ctx, next) => {
        var rpath = ctx.request.path;
        if (rpath.startsWith(prefix)) {
            let fp = path.join(dir, rpath.substring(prefix.length));
            if (await fs.exists(fp)) {
                let f = await fs.readFile(fp);
                ctx.response.type = mime.getType(rpath);
                ctx.response.body = f;
            } else {
                ctx.response.status = 404;
            }
        } else {
            await next();
        }
    }
}