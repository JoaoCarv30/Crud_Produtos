import multer, { FileFilterCallback, File } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.resolve(__dirname, '../../uploads')); // Define a pasta para salvar imagens
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}-${file.originalname}`;
    cb(null, uniqueSuffix);
  },
});

const fileFilter = (req: Request, file: File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true); // Aceita somente arquivos do tipo imagem
  } else {
    cb(new Error('Apenas arquivos de imagem são permitidos!'));
  }
};

const upload = multer({
  storage,
  fileFilter,
});

export default upload;
