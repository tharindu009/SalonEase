import validator from 'validator';
import bycrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';


//API to register a new user
const registerUser = async (req, res) => {
    try {
        //checking if the request body is empty
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({success:"false", message: "Please fill all the fields" });
        }

        //checking if the email is valid
        if(!validator.isEmail(email)){
            return res.status(400).json({success:"false", message: "Please enter a valid email" });
        }

        //checking if the password is less than 6 characters
        if(password.length < 6){
            return res.status(400).json({success:"false", message: "Password must be at least 6 characters" });
        }

        //Encrypting password
        const salt = await bycrypt.genSalt(10);
        const hashedPassword = await bycrypt.hash(password, salt);

        const userData = {
            name: name,
            email: email,
            password: hashedPassword
        }

        const newUser = new userModel(userData);
        const user = await newUser.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({success:"true", message: "User registered successfully", token: token, user: { id: user._id, name: user.name, email: user.email } }); 



    } 
    catch (error) {
        console.log(error.message);
        res.status(500).json({success:"false", message: error.message });
    }
}


//API to login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        //checking if the request body is empty
        if(!user) {
            return res.status(400).json({success:"false", message: "Invalid email or password" });
        }

        const isMatch = await bycrypt.compare(password, user.password);
        if(isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({success:"true", token: token, user: { id: user._id, name: user.name, email: user.email } });
        }
        else{
            return res.status(400).json({success:"false", message: "Invalid email or password" });
        }
        
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).json({success:"false", message: error.message });
    }
} 

export { registerUser, loginUser };