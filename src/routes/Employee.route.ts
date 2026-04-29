import express from "express";
import { deleteEmployeeByID, getAllEmployees, insertEmployee, updateEmployeeDetails } from "../controller/Employee.controller";

export const employee_router=express.Router();

employee_router.get('/',getAllEmployees);
employee_router.post('/insert',insertEmployee);
employee_router.put('/update/:name',updateEmployeeDetails);
//Dynamic Route
employee_router.delete('/delete/:empId',deleteEmployeeByID);