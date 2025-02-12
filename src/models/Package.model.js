import mongoose from "mongoose";

const packageSchema = new mongoose.Schema({
    package_img: { type: String, required: true },
    destTitle: { type: String, required: true },
    location: { type: String, required: true },
    grade: { type: String, required: true },
    fees: { type: String, required: true },
    description: { type: String, required: true },
    zone: { type: String, required: true },
    popularity: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    modifiedAt: { type: Date, default: null },
});

const Package = mongoose.model("Package", packageSchema);

export default Package;
