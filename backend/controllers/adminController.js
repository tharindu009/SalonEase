import jwt from 'jsonwebtoken';
import { v2 as cloudinary } from "cloudinary";
import serviceModel from '../models/serviceModel.js';
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';


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
            desc,
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

        //console.log(email);

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


// API to get all appointments list for admin panel
const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({});
        res.json({ success: true, appointments });
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}

//API to cancel appointment
const cancelAppointment = async (req, res) => {
    try {
        console.log("cancel appointment api");
        const { appointmentId } = req.body;

        if (!appointmentId) {
            return res.status(400).json({ success: false, message: "Appointment ID is required" });
        }

        const appointmentData = await appointmentModel.findById(appointmentId);

        if (!appointmentData) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        // Cancel the appointment
        await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });

        // Release the booked slot
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

//Admin Dashboard API
const adminDashboard = async (req, res) => {
    try {
        const users = await userModel.find({});
        const appointments = await appointmentModel.find({});
        const services = await serviceModel.find({});

        const dashData = {
            appointments: appointments.length,
            clients: users.length,
            services: services.length,
            latestappointments: appointments.reverse().slice(0, 5),
        }

        res.json({ success: true, dashData });
    }
    catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
}


export { addService, loginAdmin, allServices, appointmentsAdmin, cancelAppointment, adminDashboard };
