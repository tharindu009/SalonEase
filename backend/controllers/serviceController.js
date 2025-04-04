import serviceModel from "../models/serviceModel.js";


const changeAvailability = async (req, res) => {
    try {
        const serId = req.body.serId;
        const serviceData = await serviceModel.findById(serId);

        await serviceModel.findByIdAndUpdate(serId, { available: !serviceData.available });
        res.json({ success: true, message: "Availability Changed!" })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { changeAvailability }