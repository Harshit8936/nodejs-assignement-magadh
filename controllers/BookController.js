const Book = require('../models/Book');
const User = require('../models/User');
const Purchasehistory = require('../models/Purchasehistory'); 

// book management page and data
const allBooks = async (req,res)=>{
    try {
        const allBooks = await Book.aggregate([
            {
                $lookup:{
                    from:'users',
                    localField:"authors",
                    foreignField:"_id",
                    as:"users"
                }
            },
        ])
        // console.log(allBooks)
        // const allBooks = await Book.find();
        res.render("bookmanagement/book",{
            title:"Book Management | Books",
            books:allBooks,
            // authors:allBooks[0].users[0].name
        })
    } catch (error) {
        res.json(error)
    }
}

// create new book
const newBook = async(req,res)=>{
        try {
            const{title,authors,description,price} = req.body;
            let checkBook = await Book.findOne({title:req.body.title});
            if (checkBook) {
                return res.status(404).json({ success: false, message: "Sorry ! title already exists" })
            }
            if (req.body.price>100) {
                return res.status(404).json({ success: false, message: "Price range should be 10 - 100" })
            }
            let newBookObj = new Book({
                title: title,
                authors: authors,
                description: description,
                price: price
            })
            const newBook = await newBookObj.save();
            res.status(200).send({ success:true, message: "Book Added !", status: 200 })
        } catch (error) {
            res.status(500).send({ error: error.message, message: "Internal server error" })
        }
}

// update existing book
const updateBook = async(req,res)=>{
    try {
        const{description,price} = req.body;
        if (req.body.price>100) {
            return res.status(404).json({ success: false, message: "Price range should be 10 - 100" })
        }
        const book={
            description: description,
            price: price
        }
        let updateBook = await Book.findByIdAndUpdate({_id:req.params.id},book);
        res.status(200).send({ success:true, message: "Book Updated !", status: 200 })
    } catch (error) {
        res.status(500).send({ error: error.message, message: "Internal server error" })
    }
}

// delete existing book
const deleteBook = async(req,res)=>{
    try {
        let id = req.params.id;
        await Book.findByIdAndRemove(id);
        res.status(200).send({ success:true, message: "Book Deleted !", status: 200 })
    } catch (error) {
        res.status(500).send({ error: error.message, message: "Internal server error" })
    }
}


// new book page
const newbookPage = async (req,res)=>{
    try {
        const authors = await User.find({role:'author'});
        res.render("bookmanagement/createBook",{
            title:"Add New Book | Books",
            authors:authors
        })
    } catch (error) {
        res.json(error)
    }
}

// get single book edit page
const singleBook = async (req,res)=>{
    try {
        let id = req.params.id;
        const book = await Book.findById(id);
        if(book){
            res.render("bookmanagement/editBook",{title:"Update Book",book:book})
        }else{
            res.redirect("/bookmanagement")
        }
    } catch (error) {
        res.json({status:400,message:err})
    }
}
// get single book edit page
const viewBook = async (req,res)=>{
    try {
        let id = req.params.id;
        const book = await Book.findById(id);
        if(book){
            res.render("bookmanagement/viewBook",{title:"View Book",book:book})
        }else{
            res.redirect("/bookmanagement")
        }
    } catch (error) {
        res.json({status:400,message:error})
    }

}
// Buy book function
const buyBook = async (req,res)=>{
    try {
        const{bookId,price,quantity} = req.body;
        let checkBook = await Book.findOne({_id:bookId});
            if (!checkBook) {
                return res.status(404).json({ success: false, message: "Book not exist !" })
            }
            let buyBookObj = new Purchasehistory({
                bookId: bookId,
                price: price,
                quantity:quantity,
                userId:req.user.id,
            })

        const updatesellCount = checkBook.sellCount + parseInt(quantity);
        const buyBook = await buyBookObj.save();
        let updateBook = await Book.findByIdAndUpdate({_id:bookId},{$set:{sellCount:updatesellCount}});
        res.status(200).send({ success:true, message: "Book Purchase successfully !", status: 200 })

    } catch (error) {
        res.json({status:400,message:error})
    }
}


    
    module.exports = {allBooks,newBook,newbookPage,singleBook,updateBook,deleteBook,viewBook,buyBook }
