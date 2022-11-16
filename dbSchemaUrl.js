const mongoose = require('mongoose')
const validator = require('validator')
const shortId =require('shortid')


var shortUrlSchema = new mongoose.Schema({
    full:{type:'string',required:true},
    short:{type:'string',require:true,default:shortId.generate},
    clicks:{type:Number,require:true,default:0},
    full:{type:'string',required:true},
    createdAt:{type:Date,default:Date.now()}
})

let usersModel = mongoose.model('shortUrl',shortUrlSchema);

module.exports={mongoose,usersModel}