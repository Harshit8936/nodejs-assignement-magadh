const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/magadhAssign"

const mongoConnect = async()=>{
    try {
            await mongoose.connect(mongoURI,{useUnifiedTopology: true },
                console.log("DB is connected"))
    } catch (error) {
            console.log(error)
    }
}

module.exports = mongoConnect;