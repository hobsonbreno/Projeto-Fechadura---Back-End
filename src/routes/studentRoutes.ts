import { Router, Request, Response } from "express";
import Student from "../models/Student";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Students
 *   description: API para gerenciamento de estudantes
 */

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Criar novo estudante
 *     tags: [Students]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               enrolled:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Estudante criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Erro ao cadastrar aluno
 */
router.post("/", async (req: Request, res: Response) => {
  try {
    const student = new Student(req.body);
    const savedStudent = await student.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    console.error("Erro ao cadastrar aluno:", error);  
    res.status(400).json({ error: error instanceof Error ? error.message : "Erro ao cadastrar aluno" });
  }
});

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Listar todos os estudantes
 *     tags: [Students]
 *     responses:
 *       200:
 *         description: Lista de estudantes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       500:
 *         description: Erro no servidor
 */
router.get("/", async (_req: Request, res: Response) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Obter estudante pelo id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do estudante
 *     responses:
 *       200:
 *         description: Estudante encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Estudante não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   put:
 *     summary: Atualizar estudante pelo id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do estudante
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               age:
 *                 type: integer
 *               enrolled:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Estudante atualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Estudante não encontrado
 */
router.put("/:id", async (req: Request, res: Response) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   delete:
 *     summary: Deletar estudante pelo id
 *     tags: [Students]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do estudante
 *     responses:
 *       200:
 *         description: Estudante deletado com sucesso
 *       404:
 *         description: Estudante não encontrado
 *       500:
 *         description: Erro no servidor
 */
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
