const mongoose = require('mongoose');


const bookSchema = mongoose.Schema({
    bookId:{type:String,default:"book-" + Date.now()},
    title:{type:String},
    authors:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    description:{type:String},
    price:{type:Number},
    sellCount:{type:Number,default:0},
    createdAt:{type:Date,default:Date.now},
})
module.exports = mongoose.model('Book',bookSchema)