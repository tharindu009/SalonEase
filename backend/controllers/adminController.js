import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from "cloudinary";
import serviceModel from '../models/serviceModel.js';


//Api for adding services
const addService = async (req, res) => {
    try {
        const { name, fees, desc } = req.body;
        const imageFile = req.file;

        console.log({ name, fees, desc }, imageFile);

        //Checking Data
        if (!name || !fees || !desc) {
            return res.json({ success: false, message: "Missing Details" })
        }

        //upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, { resource_type: "image" });
        const imageUrl = imageUpload.secure_url;

        const serviceData = {
            name,
            image: imageUrl,
            fees,
            desc
        };

        const newService = new serviceModel(serviceData);
        await newService.save();
        res.json({ success: true, message: "Service Added" });
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


//API for Admin Login
const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET);
            res.json({ success: true, token });
        }
        else {
            res.json({ success: false, message: "Invalid credentials" });

        }
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });

    }
};

// API to get all services list for admin panel
const allServices = async (req, res) => {
    try {
        const services = await serviceModel.find({});
        res.json({ success: true, services });
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


export { addService, loginAdmin, allServices };
