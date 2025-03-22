import mongoose, { Schema } from "mongoose";

const serviceSchema = new mongoose.Schema({
    name: { type: String, required: true },
    image: { type: String, required: true, unique: true },
    img: { type: String, required: true, unique: true },
    fees: { type: Number, required: true },
    desc: { type: String, required: true },
}, { minimize: false })

const serviceModel = mongoose.models.service || mongoose.model("service", serviceSchema);
export default serviceModel;