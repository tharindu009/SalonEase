import validator from 'validator';
import bycrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import serviceModel from '../models/serviceModel.js';
import appointmentModel from '../models/appointmentModel.js';


//API to register a new user
const registerUser = async (req, res) => {
    try {
        //checking if the request body is empty
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        //checking if the email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        //checking if the password is less than 6 characters
        if (password.length < 6) {
            return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });
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
        res.json({ success: true, message: "User registered successfully", token: token, user: { id: user._id, name: user.name, email: user.email } });



    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}


//API to login a user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        //checking if the request body is empty
        if (!user) {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

        const isMatch = await bycrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            res.json({ success: true, token: token, user: { id: user._id, name: user.name, email: user.email } });
        }
        else {
            return res.status(400).json({ success: false, message: "Invalid email or password" });
        }

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

//API to get user profile
const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.body;
        const userData = await userModel.findById(userId).select("-password");
        if (!userData) {
            return res.status(400).json({ success: false, message: "User not found" });
        }
        res.json({ success: true, userData });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}

//API to update user profile
const updateUserProfile = async (req, res) => {
    try {
        const { userId, name, email } = req.body;

        //checking if the request body is empty
        if (!name || !email) {
            return res.status(400).json({ success: false, message: "Please fill all the fields" });
        }

        //checking if the email is valid
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: "Please enter a valid email" });
        }

        const userData = await userModel.findByIdAndUpdate(userId, { name, email }, { new: true }).select("-password");

        res.json({ success: true, message: "Profile updated successfully", userData });

    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });
    }
}
//API to update user password   

//API for booking appointment
const bookAppointment = async (req, res) => {

    try {
        const { userId, serviceId, slotDate, slotTime } = req.body;
        const serviceData = await serviceModel.findById(serviceId);

        if (!serviceData) {
            return res.json({ success: false, message: "Service not found" });
        }

        let slots_booked = serviceData.slots_booked;

        //checking if the slot is already booked
        if (slots_booked[slotDate]) {
            if (slots_booked[slotDate].includes(slotTime)) {
                //console.log("Slot not available user controller");
                return res.json({ success: false, message: "Slot not available" });
            }
            else {
                slots_booked[slotDate].push(slotTime);
            }
        }
        else {
            slots_booked[slotDate] = [];
            slots_booked[slotDate].push(slotTime);
        }

        const userData = await userModel.findById(userId).select("-password");

        delete serviceData.slots_booked;

        const appointmentData = {
            userId,
            serviceId,
            slotDate,
            slotTime,
            userData,
            serviceData,
            amount: serviceData.fees,
            date: Date.now()
        }

        const newAppointment = new appointmentModel(appointmentData);
        await newAppointment.save();

        //save new slots_booked to service data
        await serviceModel.findByIdAndUpdate(serviceId, { slots_booked });

        res.json({ success: true, message: "Appointment booked successfully" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API to get all appointments of a user
const listAppointment = async (req, res) => {
    try {

        const { userId } = req.body;
        const appointments = await appointmentModel.find({ userId });

        res.status(200).json({ success: true, appointments });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });

    }
}

//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        const { userId, appointmentId } = req.body;

        const appointmentData = await appointmentModel.findById(appointmentId);

        //verifying if the appointment belongs to the user
        if (appointmentData.userId.toString() !== userId) {
            return res.status(400).json({ success: false, message: "Unauthorized action" });
        }

        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })

        //releasing the booked slot
        const { serviceId, slotDate, slotTime } = appointmentData;

        const serviceData = await serviceModel.findById(serviceId);

        let slots_booked = serviceData.slots_booked;

        slots_booked[slotDate] = slots_booked[slotDate].filter((slot) => slot !== slotTime);

        await serviceModel.findByIdAndUpdate(serviceId, { slots_booked });
        res.status(200).json({ success: true, message: "Appointment cancelled successfully" });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({ success: false, message: error.message });

    }
}

export { registerUser, loginUser, bookAppointment, listAppointment, cancelAppointment, getUserProfile, updateUserProfile };