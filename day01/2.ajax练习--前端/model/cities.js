/*
*
* 该模块主要负责建立cities模型
* */
//1.引入mongoose模块
const mongoose = require('mongoose');

//2.获取Schema对象---------------------->请了一个保安
const Schema = mongoose.Schema;

//3.创建约束---------------------->告诉保安他的任务是干什么
let citiesSchema = new Schema({
  code:String,
  province:String,
  city:String,
  county:String,
  name:String,
  level:Number,
})

//4.创建模型对象--------------------->保安开始按照你的任务干活了
let CitiesModel = mongoose.model('cities',citiesSchema)

module.exports = CitiesModel