/*
* 该模块主要负责数据库连接
* */

//1.引入mongoose模块
const mongoose = require('mongoose');
const DBNAME = 'mongoose_test'
//2.尝试连接数据库
module.exports = new Promise((resolve,reject)=>{
  //2.连接到指定数据库
  mongoose.connect(`mongodb://localhost:27017/${DBNAME}`,{ useNewUrlParser: true });

  //3.绑定监听，看数据库的连接状态
  mongoose.connection.once('open',(err)=>{
    if(!err){
      console.log('数据库连接成功了！')
      resolve();
    }else{
      reject(err);
      console.log(err)
    }
  })
});

