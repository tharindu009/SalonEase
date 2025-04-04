import express from 'express';
import { registerUser } from '../controllers/userController.js';


const userRouter = express.Router();

//Route to register a new user
userRouter.post('/register', registerUser);




export default userRouter;