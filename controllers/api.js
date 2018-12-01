const fs = require('mz/fs');

const path = require('path');

const APIError = require('../rest').APIError;

// 返回字符串
var data = fs.readFileSync(path.join(__dirname, '../data.json'),  'utf8');

module.exports = {
    "GET /api/v1/topics": async (ctx, next) => {
        ctx.rest(data);
    },

    "GET /api/v1/topic/:id": async (ctx, next) => {
        let topics = JSON.parse(data).data,
            flag = false;
        for (topic of topics) {
            if (topic.id === ctx.params.id) {
                ctx.rest(topic);
                flag = true;
                break;
            }
        }
        if (!flag) {
            throw new APIError('data:not_found', 'data not found by id');
        }
    },

    "POST /api/v1/topics": async (ctx, next) => {
        console.log('to be done');
    },

    "POST /api/v1/topics/update": async (ctx, next) => {
        console.log('to be done')
    }
}