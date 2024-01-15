const User = require('../Model/User.js')
var bcrypt = require('bcryptjs');

const getAllUsers = async(req, res) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        console.error(error);
    }
    if(!users){
        res.status(400).json({ message: "No users found..." });
    }
    res.status(200).json({users : users});
}

const signup = async(req, res, next) => {
    const {name, email, password} = req.body ;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(existingUser){
        return res.status(400).json({message:"User already exists, kindly login"})
    }
    var hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        password : hashedPassword,
        blogs : []
    })
    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({user});
}

const login = async(req, res) => {
    const {email, password} = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({email});
    } catch (error) {
        return console.log(error);
    }

    if(!existingUser){
        return res.status(404).json({message:"Can't fins the email"})
    }

    const isPasswodCorrect = bcrypt.compareSync(password, existingUser.password);
    if(!isPasswodCorrect){
        return res.status(400).json({message:"Password is incorrect !"})
    }
    return res.status(200).json({message:"Login Successfull !"})
}

module.exports = {getAllUsers, signup, login}



