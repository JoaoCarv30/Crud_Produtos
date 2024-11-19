// src/@types/express.d.ts
import { Request } from "express";
import { File } from 'multer';


declare module "express" {
  interface Request {
    userId?: string;
  }}
  
  declare global {
    namespace Express {
      interface Request {
        file?: File;
      }
    }
  }