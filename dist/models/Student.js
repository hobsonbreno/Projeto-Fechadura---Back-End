import mongoose, { Schema } from "mongoose";
const studentSchema = new Schema({
    name: { type: String, required: true },
    registration: { type: String, required: true },
    financialStatus: { type: String, required: true },
    photos: [String],
    document: { type: String },
}, { timestamps: true });
const Student = mongoose.model("Student", studentSchema);
export default Student;
