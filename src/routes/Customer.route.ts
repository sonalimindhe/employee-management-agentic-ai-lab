import express from "express";
import {
    createCustomer,
    deleteCustomer,
    getCustomerById,
    listCustomers,
    updateCustomer
} from "../controller/Customer.controller";

export const customer_router = express.Router();

customer_router.post("/", createCustomer);
customer_router.get("/", listCustomers);
customer_router.get("/:id", getCustomerById);
customer_router.put("/:id", updateCustomer);
customer_router.delete("/:id", deleteCustomer);
