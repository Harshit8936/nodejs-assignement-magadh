const User = require('../models/User');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');
const JWT_SECRET = "h@rsh!t";

// User sign up function
const userSignup = async (req, res) => {
    try {
        const { name, email, role } = req.body;
        let newUserObj = await User.findOne({ email: email });
        if (newUserObj) {
            return res.status(404).json({ success: false, message: "Sorry ! email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPassword = await bcrypt.hash(req.body.password, salt)
         newUserObj = new User({
            name: name,
            email: email,
            password: secPassword,
            role: role
        })
        const newUser = await newUserObj.save();
        res.status(200).send({ success:true, message: "Sign up successfully !", status: 200 })
        // res.status(200).redirect(`/signin`);
    } catch (error) {
        res.status(500).send({ error: error.message, message: "Internal server error" })
    }
}

// Authenticate the user for user sign in

const signInUser = async (req,res)=>{
    try {
     const{email,password} = req.body;
     if(!email || !password){
        return res.status(404).json({message: "Both email and password required" })
     }
        let user = await User.findOne({email:email});
        if(!user){
            return res.status(404).json({message: "Please try to login correct creds !" })
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(404).json({message: "Please try to login correct creds !" })
        }
        const data = {
            user:{
                id:user._id
            }
        }
        
        // jwt.sign means generate authtoken
        const authToken = jwt.sign(data,JWT_SECRET);
        res.status(200).send({ success:true, message: "Login IN successfully!", status: 200,token:authToken })
     } catch (error) {
            res.status(500).send({ error:error.message,message:"Internal server error" })
     }
     
}

// home page display
const homePage = (req, res) => {
    try {
        res.render("home", {
            title: "Home Page",

        })
    } catch (error) {
        res.json(error)
    }
}
// signup page display
const signupPage = (req, res) => {
    try {
        res.render("user/signup", {
            title: "Sign Up | Books"
        })
    } catch (error) {
        res.json(error)
    }
}
// signup in display
const signinPage = (req, res) => {
    try {
        res.render("user/signin", {
            title: "Sign IN | Books"
        })
    } catch (error) {
        res.json(error)
    }
}

// user management page and data
const allUsers = async (req,res)=>{
try {
    const allUsers = await User.find();
    res.render("usermanagement/allUser",{
        title:"User Management | Books",
        users:allUsers
    })
} catch (error) {
    res.json(error)
}
}

module.exports = { userSignup,signInUser, homePage, signupPage, signinPage, allUsers }