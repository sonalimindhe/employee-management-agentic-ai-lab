import mongoose, { Document } from "mongoose";
import { randomUUID } from "crypto";
import { Customer } from "../interface/Customer.interface";

const addressSchema = new mongoose.Schema(
    {
        line1: {
            type: String,
            trim: true
        },
        line2: {
            type: String,
            trim: true
        },
        city: {
            type: String,
            trim: true
        },
        state: {
            type: String,
            trim: true
        },
        postalCode: {
            type: String,
            trim: true
        },
        country: {
            type: String,
            trim: true
        }
    },
    { _id: false }
);

const customerSchema = new mongoose.Schema(
    {
        customerId: {
            type: String,
            required: true,
            unique: true,
            immutable: true,
            default: () => randomUUID()
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 50
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        },
        phone: {
            type: String,
            required: false,
            trim: true,
            match: /^\+?\d{10,15}$/
        },
        status: {
            type: String,
            required: true,
            enum: ["Active", "Inactive"],
            default: "Active"
        },
        address: {
            type: addressSchema,
            required: false,
            validate: {
                validator: (value: any) => {
                    if (!value) {
                        return true;
                    }

                    return Boolean(
                        value.line1 &&
                            value.city &&
                            value.state &&
                            value.postalCode &&
                            value.country
                    );
                },
                message:
                    "If address is provided, line1, city, state, postalCode, and country are required."
            }
        }
    },
    {
        timestamps: true
    }
);

interface CustomerModelType extends Document, Omit<Customer, "createdAt" | "updatedAt"> {
    createdAt: Date;
    updatedAt: Date;
}

export const customerModel = mongoose.model<CustomerModelType>("CustomerDetail", customerSchema);
