import { Request, Response } from "express";
import Student from "../models/Student";

export const getStudents = async (req: Request, res: Response) => {
  const students = await Student.find();
  res.json(students);
};

export const getStudentById = async (req: Request, res: Response) => {
  const student = await Student.findById(req.params.id);
  if (!student) return res.status(404).json({ message: "Student not found" });
  res.json(student);
};

export const createStudent = async (req: Request, res: Response) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.status(201).json(newStudent);
};

export const updateStudent = async (req: Request, res: Response) => {
  const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
  res.json(updatedStudent);
};

export const deleteStudent = async (req: Request, res: Response) => {
  const deletedStudent = await Student.findByIdAndDelete(req.params.id);
  if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
  res.json({ message: "Student deleted" });
};
