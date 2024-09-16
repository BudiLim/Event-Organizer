import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const uploader = (filePrefix: string, folderName?: string) => {
  const defaultDir = path.join(__dirname, '../../public');
  
  // Check if the folder exists, if not, create it
  const ensureFolderExists = (folderPath: string) => {
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  };

  const storage = multer.diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback
    ) => {
      const destination = folderName ? path.join(defaultDir, folderName) : defaultDir;
      
      // Ensure the folder exists
      ensureFolderExists(destination);
      
      cb(null, destination);
    },
    filename: (
      req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback
    ) => {
      const originalNameParts = file.originalname.split('.');
      const fileExtension = originalNameParts[originalNameParts.length - 1];
      const newFileName = filePrefix + Date.now() + '.' + fileExtension;
      cb(null, newFileName);
    }
  });

  return multer({ storage: storage });
};
