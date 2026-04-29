import request from 'supertest';
import mongoose from 'mongoose'
import app from '../app';

beforeAll(async()=>{
    await mongoose.connect('mongodb://localhost:27017/NodeJS_30_10_2025')
})

afterAll(async()=>{
    // await mongoose.disconnect()
})

afterEach(()=>{
    mongoose.connection.collection("employeedetails").deleteMany({})
})


//to group related test case as one unit
describe("Employee Details-API test",()=>{

    it("POST-Employee Details test.",async()=>{
        let response=await request(app).post('/employee/insert').send(
            {                
                "_id": 200,
                "name": "Omkar Mindhe",
                "email": "omkar@cybage.com",
                "designation": "Manager",
                "salary": 320000
            }
         )
         expect(response.statusCode).toBe(200)
         expect(response.body.message).toBe("Inserted Successfuly!!!")
         expect(response.body.employee.name).toBe("Omkar Mindhe")
    })
    it("GET-Employee Details test.",async()=>{

        let employees=[
            {                
                "_id": 200,
                "name": "Omkar Mindhe",
                "email": "omkar@cybage.com",
                "designation": "Manager",
                "salary": 320000
            },
            {                
                "_id": 201,
                "name": "Ashish Pawar",
                "email": "ashish@cybage.com",
                "designation": "Sr. Manager",
                "salary": 520000
            },
            {                
                "_id": 202,
                "name": "Komal Jadhav",
                "email": "komal@cybage.com",
                "designation": "QA",
                "salary": 70000
            }
        ]

        for (let emp of employees)
        {
         await request(app).post('/employee/insert').send(emp)
        }


       let  response=await request(app).get('/employee')
       console.log("GetAPI-Result");       
       console.log(response);
       //Assertion
        expect(response.statusCode).toBe(200)      
        expect(response.body).toHaveLength(3) 
    })

    it("DELETE-Employee Details test.",async()=>{

        let employees=[
            {                
                "_id": 200,
                "name": "Omkar Mindhe",
                "email": "omkar@cybage.com",
                "designation": "Manager",
                "salary": 320000
            },
            {                
                "_id": 201,
                "name": "Ashish Pawar",
                "email": "ashish@cybage.com",
                "designation": "Sr. Manager",
                "salary": 520000
            },
            {                
                "_id": 202,
                "name": "Komal Jadhav",
                "email": "komal@cybage.com",
                "designation": "QA",
                "salary": 70000
            }
        ]

        for (let emp of employees)
        {
         await request(app).post('/employee/insert').send(emp)
        }


       let  response=await request(app).delete('/employee/delete/201')
       
       //Assertion
        expect(response.statusCode).toBe(200)      
        expect(response.body.message).toBe("Record Deleted !!!")
    })

    it("DELETE-Negative-Employee Details test.",async()=>{

        let employees=[
            {                
                "_id": 200,
                "name": "Omkar Mindhe",
                "email": "omkar@cybage.com",
                "designation": "Manager",
                "salary": 320000
            },
            {                
                "_id": 201,
                "name": "Ashish Pawar",
                "email": "ashish@cybage.com",
                "designation": "Sr. Manager",
                "salary": 520000
            },
            {                
                "_id": 202,
                "name": "Komal Jadhav",
                "email": "komal@cybage.com",
                "designation": "QA",
                "salary": 70000
            }
        ]

        for (let emp of employees)
        {
         await request(app).post('/employee/insert').send(emp)
        }


       let  response=await request(app).delete('/employee/delete/203')
       
       //Assertion
        expect(response.statusCode).toBe(404)      
        expect(response.body.message).toBe("No Matching Record Found !!!")
    })
})





// npm install --save-dev jest ts-jest @types/jest supertest @types/supertest typescript
