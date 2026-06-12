import { NextFunction, Request, Response } from "express";
import { customerModel } from "../model/Customer.model";

const sendSuccess = (
    response: Response,
    statusCode: number,
    message: string,
    data: unknown = null
) => {
    return response.status(statusCode).json({
        success: true,
        message,
        data
    });
};

const sendError = (
    response: Response,
    statusCode: number,
    message: string,
    error: unknown = null
) => {
    return response.status(statusCode).json({
        success: false,
        message,
        error
    });
};

const handleMongooseValidation = (error: any, response: Response) => {
    if (error?.name === "ValidationError") {
        return sendError(response, 400, "Validation failed.", error.errors);
    }

    if (error?.code === 11000) {
        return sendError(response, 409, "Duplicate value violation.", error.keyValue);
    }

    return null;
};

export const createCustomer = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { firstName, lastName, email, phone, status, address } = request.body;

        if (!firstName || !lastName || !email) {
            return sendError(
                response,
                400,
                "firstName, lastName, and email are required."
            );
        }

        const customer = new customerModel({
            firstName,
            lastName,
            email,
            phone,
            status,
            address
        });

        const result = await customer.save();

        return sendSuccess(response, 201, "Customer created successfully.", result);
    } catch (error: any) {
        const handled = handleMongooseValidation(error, response);
        if (handled) return handled;
        return next(error);
    }
};

export const getCustomerById = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { id } = request.params;

        if (!id) {
            return sendError(response, 400, "id is required.");
        }

        const result = await customerModel.findOne({ customerId: id });

        if (!result) {
            return sendError(response, 404, "Customer not found.");
        }

        return sendSuccess(response, 200, "Customer fetched successfully.", result);
    } catch (error) {
        return next(error);
    }
};

export const updateCustomer = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { id } = request.params;

        if (!id) {
            return sendError(response, 400, "id is required.");
        }

        if ("customerId" in request.body || "createdAt" in request.body) {
            return sendError(
                response,
                400,
                "customerId and createdAt are immutable fields and cannot be updated."
            );
        }

        const result = await customerModel.findOneAndUpdate(
            { customerId: id },
            { $set: request.body },
            { new: true, runValidators: true }
        );

        if (!result) {
            return sendError(response, 404, "Customer not found.");
        }

        return sendSuccess(response, 200, "Customer updated successfully.", result);
    } catch (error: any) {
        const handled = handleMongooseValidation(error, response);
        if (handled) return handled;
        return next(error);
    }
};

export const deleteCustomer = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const { id } = request.params;

        if (!id) {
            return sendError(response, 400, "id is required.");
        }

        const result = await customerModel.deleteOne({ customerId: id });

        if (result.deletedCount === 0) {
            return sendError(response, 404, "Customer not found.");
        }

        return sendSuccess(response, 200, "Customer deleted successfully.");
    } catch (error) {
        return next(error);
    }
};

export const listCustomers = async (
    request: Request,
    response: Response,
    next: NextFunction
) => {
    try {
        const result = await customerModel.find().sort({ createdAt: -1 });
        return sendSuccess(response, 200, "Customers fetched successfully.", result);
    } catch (error) {
        return next(error);
    }
};
