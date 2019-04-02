/**
 * 数据库操作：CRUD
 * 1. 增
 * 2. 删
 * 3. 改
 * 4. 查
 * 
 * 5. 连接
 * 6. 关闭
 */
const mongodb = require('mongodb');

const MongoClient = mongodb.MongoClient;

const database_url = 'mongodb://localhost:27017';

const database_name = 'BMS';

// 连接
async function connect() {
    let client = await MongoClient.connect(database_url);

    let db = client.db(database_name);

    return { db, client };
};

// 增
exports.insert = async (colName, data) => {
    let { db, client } = await connect();

    let collection = db.collection(colName);

    let res = await collection[Array.isArray(data) ? 'insertMany' : 'insertOne'](data);

    client.close();
    // console.log(res);
    return res;

};

// 删
exports.delete = async (colName, query) => {

    let { db, client } = await connect();

    let collection = db.collection(colName);

    let res = await collection['deleteMany'](query);

    client.close();

    return res;
};

// 改
exports.update = async (colName, query, newData) => {

    let { db, client } = await connect();

    let collection = db.collection(colName);

    let res = await collection['updateMany'](query, { $set: newData });
    // db.user.updateMany( { age: { $gt : 18 } } , { $set : { description : "成年"} } );

    client.close();

    return res;
};


// 查
exports.find = async (colName, query, page, limit) => {

    let { db, client } = await connect();

    let collection = db.collection(colName);

    if (page && limit) {
        let res = await collection.find(query).skip((page - 1) * limit).limit(limit).toArray();

        client.close();

        // 返回查询结果
        return res;

    } else {
        let res = await collection.find(query).toArray();

        client.close();

        // 返回查询结果
        return res;
    };
};

// insert('user',{name:'laoxie'});