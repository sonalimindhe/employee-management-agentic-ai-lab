import express from "express";
import { employee_router } from "./routes/Employee.route";
import { customer_router } from "./routes/Customer.route";
import { connectDB } from "./config/dbConnect";

const app = express();

app.use(express.json());

app.use('/employee', employee_router);
app.use('/api/customers', customer_router);

connectDB();

export default app;