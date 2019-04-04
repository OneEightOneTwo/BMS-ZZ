// const Koa = require('koa');

const Router = require('koa-router');

const koaBody = require('koa-body');

// 创建路由
var router = new Router();

// 引入页面路由
const loginRouter = require('./login');//注册【1】
const verifyRouter = require('./tokenverify');//验证【2】
const userlistRouter = require('./userlist');//用户列表【3】
const usereditRouter = require('./user_edit');//个人信息【4】
const useraddRouter = require('./user_add');//添加用户【5】
const orderRouter = require('./order');//订单列表【6】

// 大哥
const goodslistRouter = require('./goodslist');//商品列表【7】
const addGoodsRouter = require('./addGoods');//添加商品【8】
const editGoodsRouter = require('./editGoods');//商品编辑【9】
const categoryRouter = require('./category');//商品分类【10】



router.use(koaBody({
    // 支持formdata
    multipart: true,

    // 文件支持
    formidable: {
        // 指定保存路径
        uploadDir: './uploads',
        keepExtensions: true,
        // 改文件名
        onFileBegin(filename, file) {
            // filename: 上传文件的原始名
            // file:文件信息对象
            //   * path:

            // file.path = './uploads/'+filename
        }
    }
}));

router.use('/login', loginRouter.routes());//【1】
router.use('/verify', verifyRouter.routes());//【2】
router.use('/userlist', userlistRouter.routes());//【3】
router.use('/useredit', usereditRouter.routes());//【4】
router.use('/useradd', useraddRouter.routes());//【5】
router.use('/order', orderRouter.routes());//【6】

// 大哥
router.use('/goodslist', goodslistRouter.routes());//【7】
router.use('/addGoods', addGoodsRouter.routes());//【8】
router.use('/editGoods', editGoodsRouter.routes());//【9】
router.use('/category', categoryRouter.routes());//【10】

module.exports = router;