const mongoose = require('mongoose');
const dateObj = new Date();
const month   = dateObj.getUTCMonth() + 1;
const year    = dateObj.getUTCFullYear();
const newDate = `${year}-${month}`;

const purchaseHistorySchema = mongoose.Schema({
    history_id:{type:String,default:newDate+ "-"+ Date.now()},
    purchaseId:{type:String,default:"Purchase_" +Date.now()},
    bookId:{type:mongoose.Schema.Types.ObjectId,ref:'Book'},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    purchaseDate:{type:Date,default:Date.now},
    price:{type:Number},
    quantity:{type:Number},
})
module.exports = mongoose.model('Purchasehistory',purchaseHistorySchema)