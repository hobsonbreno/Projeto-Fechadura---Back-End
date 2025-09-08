import { Router, Request, Response } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import Student from "../models/Student";

const router = Router();

// Garante pastas
const ensureDirs = () => {
  ["./uploads/photos", "./uploads/docs"].forEach(dir => {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  });
};
ensureDirs();

// Configuração do Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname.startsWith("photo")) {
      cb(null, "uploads/photos");
    } else {
      cb(null, "uploads/docs");
    }
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${Date.now()}${ext}`;
    cb(null, filename);
  }
});
const upload = multer({ storage });

// POST /students
router.post("/", upload.any(), async (req: Request, res: Response) => {
  try {
    const { name, registration, financialStatus } = req.body;

    const files = req.files as Express.Multer.File[];

    const photos = files
      .filter(f => f.fieldname.startsWith("photo"))
      .map(f => f.path);

    const document = files.find(f => f.fieldname === "file")?.path ?? "";

    const student = new Student({
      name,
      registration,
      financialStatus,
      photos,
      document
    });

    await student.save();
    res.status(201).json(student);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao cadastrar aluno" });
  }
});

// GET /students
router.get("/", async (_req: Request, res: Response) => {
  const students = await Student.find();
  res.json(students);
});

// GET /students/:id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Aluno não encontrado" });
    res.json(student);
  } catch {
    res.status(500).json({ error: "Erro ao buscar aluno" });
  }
});

// DELETE /students/:id
router.delete("/:id", async (req: Request, res: Response) => {
  try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).json({ error: "Aluno não encontrado" });

    // Remove arquivos
    student.photos.forEach(photo => fs.existsSync(photo) && fs.unlinkSync(photo));
    if (student.document && fs.existsSync(student.document)) {
      fs.unlinkSync(student.document);
    }

    res.json({ message: "Aluno removido com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao excluir aluno" });
  }
});

export default router;
