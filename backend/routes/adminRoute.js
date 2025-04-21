import express from 'express'
import { addService, allServices, appointmentsAdmin, cancelAppointment } from '../controllers/adminController.js';
import upload from '../middleware/multer.js';
import { loginAdmin } from '../controllers/adminController.js'
import authAdmin from '../middleware/authAdmin.js';
import { changeAvailability } from '../controllers/serviceController.js';

const adminRouter = express.Router();

adminRouter.post('/login', loginAdmin);
adminRouter.post('/add-service', authAdmin, upload.single('image'), addService);
adminRouter.post('/service-list', authAdmin, allServices);
adminRouter.post('/change-availability', authAdmin, changeAvailability);
adminRouter.get('/appointments', authAdmin, appointmentsAdmin);

//Route to cancel an appointment
adminRouter.post('/cancel-appointment', authAdmin, cancelAppointment);

export default adminRouter;