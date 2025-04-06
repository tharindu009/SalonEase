import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true, unique: true },
    fees: { type: String, required: true },
    desc: { type: String, required: true },
    available: { type: Boolean, default: true },
    slots_booked: { type: Object, default: {} },
    date: { type: Number, required: true },
}, { minimize: false })

const serviceModel = mongoose.models.service || mongoose.model("service", serviceSchema);

export default serviceModel;