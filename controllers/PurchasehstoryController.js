const Purchasehistory = require('../models/Purchasehistory');

// get all history
const allhistory = async (req,res)=>{
    try {
        const histories = await Purchasehistory.aggregate([
            // {
            //     $match:{userId:req.user.id}
            // },
            {
                $lookup:{
                    from:"users",
                    localField:"userId",
                    foreignField:"_id",
                    as:"userData"
                }
            },
            {
                $lookup:{
                    from:"books",
                    localField:"bookId",
                    foreignField:"_id",
                    as:"bookData"
                }
            }
        ]);
        res.render("history/purchasehistory",{
            title:"Purchase History | Books",
            histories:histories,
        })
    } catch (error) {
        res.json(error)
    }
}


module.exports = {allhistory}