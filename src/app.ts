import express from "express";
import { employee_router } from "./routes/Employee.route";
import { connectDB } from "./config/dbConnect";

//Create Express App
const app=express();
//Middleware to parse JSON request bodies
app.use(express.json());
//Applay Employee Router
app.use('/employee',employee_router)
//Establish Connection
connectDB()


export default app;
