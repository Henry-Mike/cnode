const fs = require('mz/fs');
const path = require('path');
const _ = require('underscore');

function addControllers(router, dir) {
    fp =  path.join(__dirname, dir);
    files = fs.readdirSync(fp).filter((f) => {
        return f.endsWith('.js')
    }).forEach((f) => {
        console.log(`Process controller ${f}...`)
        let mapping = require(__dirname  + dir + f);
        addMapping(router, mapping)
    });
}

function addMapping(router, mapping) {
    _.map(mapping, (v, k) => {
        if (k.startsWith('GET ')) {
            router.get(k.substring(4), v);
            console.log(`register URL mapping: ${k}`);
        } else if (k.startsWith('POST ')) {
            router.post(k.substring(5), v);
            console.log(`register URL mapping: ${k}`);
        } else if (k.startsWith('PUT ')) {
            router.put(k.substring(4), v);
            console.log(`register URL mapping: ${k}`);
        } else if (k.startsWith('DELETE ')) {
            router.delete(k.substring(7), v);
            console.log(`register URL mapping: ${k}`);
        } else {
            console.log(`Invalid Request: ${k}`)
        }
    });
}

module.exports = function (dir) {
    let 
        controller_dir = dir || '/controllers/',
        router = require('koa-router')();
    addControllers(router, controller_dir);
    return router.routes();
}