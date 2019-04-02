// 路由
const Router = require('koa-router');

// 数据库的增删改查
const db = require('../db');

// token
const token = require('../utils/token');

// 创建新路由
var router = new Router();

// post请求
router.post('/', async (ctx, next) => {
    let { username, password } = ctx.request.body;

    //查
    let res = await db.find('user', { username, password });

    res = res[0];

    // if (res) {
    //     // 登陆成功，发令牌
    //     let _token = token.create(username);
    //     if (res.superUser) {
    //         ctx.body = {
    //             _id: res._id,
    //             username: res.username,
    //             gender: res.gender,
    //             regtime: res.regtime,
    //             superUser: res.superUser,
    //             token: _token,
    //             code: 200
    //         };
    //     } else {
    //         ctx.body = {
    //             _id: res._id,
    //             username: res.username,
    //             gender: res.gender,
    //             regtime: res.regtime,
    //             token: _token,
    //         };
    //     };
    // } else {
    //     ctx.body = {
    //         code: 100,
    //         msg: 'fail'
    //     };
    // };



    if (res) {
        // 登录成功：发令牌
        let _token = token.create(username);

        ctx.body = {
            _id: res._id,
            username: res.username,
            // gender: res.gender,
            // regtime: res.regtime,
            code: 200,
            token: _token
        };
    } else {
        ctx.body = {
            code: 100,
            msg: 'fail'
        }
    }

});

module.exports = router;