import request from "supertest";
import mongoose from "mongoose";
import app from "../app";
import { afterAll, afterEach, beforeAll, describe, expect, it } from "@jest/globals";

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/NodeJS_30_10_2025");
});

afterAll(async () => {
    // await mongoose.disconnect();
});

afterEach(async () => {
    await mongoose.connection.collection("customerdetails").deleteMany({});
});

// to group related test case as one unit
describe("Customer Details-API test", () => {
    const validCustomer = {
        firstName: "Sonali",
        lastName: "Maind",
        email: "sonali@cybage.com",
        phone: "+919999999999",
        status: "Active",
        address: {
            line1: "Hinjewadi Phase 1",
            city: "Pune",
            state: "Maharashtra",
            postalCode: "411057",
            country: "India"
        }
    };

    it("POST-Customer Details test.", async () => {
        const response = await request(app).post("/api/customers").send(validCustomer);

        expect(response.statusCode).toBe(201);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Customer created successfully.");
        expect(response.body.data.firstName).toBe("Sonali");
        expect(response.body.data.customerId).toBeDefined();
    });

    it("GET-Customer By Id test.", async () => {
        const createResponse = await request(app).post("/api/customers").send(validCustomer);
        const customerId = createResponse.body.data.customerId;

        const response = await request(app).get(`/api/customers/${customerId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Customer fetched successfully.");
        expect(response.body.data.customerId).toBe(customerId);
    });

    it("PUT-Update Customer test.", async () => {
        const createResponse = await request(app).post("/api/customers").send(validCustomer);
        const customerId = createResponse.body.data.customerId;

        const response = await request(app)
            .put(`/api/customers/${customerId}`)
            .send({
                firstName: "UpdatedName",
                status: "Inactive"
            });

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Customer updated successfully.");
        expect(response.body.data.firstName).toBe("UpdatedName");
        expect(response.body.data.status).toBe("Inactive");
    });

    it("DELETE-Customer test.", async () => {
        const createResponse = await request(app).post("/api/customers").send(validCustomer);
        const customerId = createResponse.body.data.customerId;

        const response = await request(app).delete(`/api/customers/${customerId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Customer deleted successfully.");
    });

    it("GET-List Customers test.", async () => {
        const customers = [
            {
                firstName: "Asha",
                lastName: "Patil",
                email: "asha@cybage.com",
                status: "Active"
            },
            {
                firstName: "Rohit",
                lastName: "Kale",
                email: "rohit@cybage.com",
                status: "Inactive"
            }
        ];

        for (const customer of customers) {
            await request(app).post("/api/customers").send(customer);
        }

        const response = await request(app).get("/api/customers");

        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Customers fetched successfully.");
        expect(response.body.data).toHaveLength(2);
    });

    it("POST-Invalid Email test.", async () => {
        const response = await request(app).post("/api/customers").send({
            firstName: "Invalid",
            lastName: "Email",
            email: "invalid-email-format",
            status: "Active"
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Validation failed.");
    });

    it("POST-Duplicate Email test.", async () => {
        const customer = {
            firstName: "Duplicate",
            lastName: "User",
            email: "duplicate@cybage.com",
            status: "Active"
        };

        await request(app).post("/api/customers").send(customer);
        const response = await request(app).post("/api/customers").send(customer);

        expect(response.statusCode).toBe(409);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Duplicate value violation.");
    });

    it("POST-Missing Required Fields test.", async () => {
        const response = await request(app).post("/api/customers").send({
            email: "missing@cybage.com",
            status: "Active"
        });

        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("firstName, lastName, and email are required.");
    });
});
