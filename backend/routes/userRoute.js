import express from 'express';
import { registerUser,loginUser,bookAppointment, listAppointment, cancelAppointment } from '../controllers/userController.js';
import authUser from '../middleware/authUser.js';


const userRouter = express.Router();

//Route to register a new user
userRouter.post('/register', registerUser);

//Route to login a user
userRouter.post('/login', loginUser);

//Route to book an appointment
userRouter.post('/book-appointment', authUser, bookAppointment);

//Route to get all appointments of a user
userRouter.get('/appointments', authUser, listAppointment);

//Route to cancel an appointment
userRouter.post('/cancel-appointment', authUser, cancelAppointment);




export default userRouter;