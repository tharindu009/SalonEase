import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import adminRouter from "./routes/adminRoute.js";
import connectCloudinary from "./config/cloudinary.js";


// App config
const app = express();
const port = process.env.PORT || 4000;
connectDB();
connectCloudinary();

// middlewares
app.use(express.json());
app.use(cors());

//API endpoints
app.use("/api/admin", adminRouter);


//-----
app.get("/", (req, res) => {
    res.send("SalonEase API Working")
  });


  app.listen(port, () => console.log(`Server started on PORT:${port}`));