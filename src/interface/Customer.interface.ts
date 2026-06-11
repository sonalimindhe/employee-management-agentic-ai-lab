export type CustomerStatus = "Active" | "Inactive";

export interface Address {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface Customer {
    customerId: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    status: CustomerStatus;
    address?: Address;
    createdAt: Date;
    updatedAt: Date;
}
