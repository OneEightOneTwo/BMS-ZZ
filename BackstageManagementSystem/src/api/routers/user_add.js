const Router = require('koa-router');

const db = require('../db');
// 创建路由
var router = new Router();

router.post('/', async (ctx, next) => {
    let res = await db.insert('user', ctx.request.body);

    if (res) {
        ctx.body = {
            code: 200,
            msg: "添加成功",
        };
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        };
    };

});

router.post('/has', async (ctx, next) => {
    let res = await db.find('user', ctx.request.body);

    if (res.length > 0) {
        ctx.body = {
            code: 200,
            msg: "用户名已存在"
        };
    } else {
        ctx.body = {
            code: 100,
            msg: "可以注册"
        };
    };
});

module.exports = router;