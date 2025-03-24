import express from 'express'
import { addService } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import {loginAdmin} from '../controllers/adminController.js'

const adminRouter = express.Router();

adminRouter.post('/login',loginAdmin);

adminRouter.post('/add-service',upload.single('image'),addService);

export default adminRouter;