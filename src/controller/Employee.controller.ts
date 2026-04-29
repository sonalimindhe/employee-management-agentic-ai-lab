import { Request, Response } from "express";
import { employeeModel } from "../model/Employee.model";

//Route Handler Function
export const insertEmployee = async (request: Request, response: Response) => {
    try {
        //destructure Object
        const { _id, name, email, designation, salary } = request.body
        //Create EmployeeModel Object
        console.log("In controller");
        console.log(request.body);
        
        
        const employee = new employeeModel({ _id, name, email, designation, salary })
        const result = await employee.save()
        response.status(200).json(
            {
                "message": "Inserted Successfuly!!!",
                "employee": result
            }
        )
    }
    catch (error) {
        response.status(400).json(
            {
                "message": "Please Try Again!!!",
                "error": error
            }
        )
    }
}


export const getAllEmployees = async(request: Request, response: Response) => {

    try {
            
        let result =await employeeModel.find()
        response.status(200).json(result)

    }
    catch (error) {
         response.status(400).json(
            {
                "message": "Please Try Again!!!",
                "error": error
            })
    }
}

export const deleteEmployeeByID=async(request:Request,response:Response)=>{
    try
    {
       const result=await employeeModel.deleteOne(
            {
                '_id':{$eq:request.params.empId}
            }
        )
        if(result.deletedCount==1)
            response.status(200).json({"message":"Record Deleted !!!"})
        else
            response.status(404).json({"message":"No Matching Record Found !!!"})
    }
    catch(error)
    {
          response.status(400).json(
            {
                "message": "Please Try Again!!!",
                "error": error
            })
    }

}

export const updateEmployeeDetails=async(request:Request,response:Response)=>{
    try{

       const result= await employeeModel.updateOne(
            {
                "name":request.params.name
            },
            {
                $set:request.body
            }
        )
        if(result.modifiedCount==1)
            response.status(200).json({"message":"Record Updated !!!","result":result})
        else
            response.status(404).json({"message":"No Matching Record Found !!!"})
    }
    catch(error)
    {
         response.status(400).json(
            {
                "message": "Please Try Again!!!",
                "error": error
            })
    }
}


