import e from "express";
import mongoose, { Document } from "mongoose";
import { Employee } from "../interface/Employee.interface";

//define employee schema
const employeeSchema=new mongoose.Schema(
    {
        '_id':{
            type:Number,
            required:true
        },
        'name':{
            type:String,
            required:true
        },
        'email':{
            type:String,
            required:true,
            unique:true
        },
        'designation':{
            type:String,
            required:true
        },
        'salary':{
            type:Number,
            required:true
        }
    }
)
//create type for employee model
/*
Employee--_id/name/email/designation/salary
Document--mongoose document methods/properties
        Example:-find(),save(),populate()/findById(),findOne(),deleteOne()/deleteMany() etc
*/
interface Employee_Model_Type extends Document,Employee{
    '_id':number;
}

//create employee model(collection_name,schema)--create the collection into database
export const employeeModel=mongoose.model<Employee_Model_Type>('EmployeeDetail',employeeSchema)