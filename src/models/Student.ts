import { Schema, model } from "mongoose";

interface Student {
  name: string;
  registration:string;
  financialStatus:string;
  email: string;
  photos:boolean;
  document:boolean;
  age?: number;
  enrolled: boolean;
}

const studentSchema = new Schema<Student>({
  name: { type: String, required: true },
  registration: { type: String, required: true },
  financialStatus: { type: String, required: true },
  photos: { type: Boolean, default: true },
  document: { type: Boolean, default: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number },
  enrolled: { type: Boolean, default: true },
}, {
  timestamps: true,
});

const Student = model<Student>("Student", studentSchema);

export default Student;
