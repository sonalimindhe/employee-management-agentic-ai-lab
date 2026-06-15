# Employee Management REST API

Node.js + TypeScript REST API with Employee and Customer modules.

## Tech Stack
- Node.js
- TypeScript
- Express 5
- Mongoose
- Jest + Supertest

## Run Locally

Prerequisites:
- Node.js 18+ (recommended)
- MongoDB running locally on default port

Install dependencies:
npm install

Run development server:
npm run dev

Run tests:
npm test

## API Modules

### Employee Module
Base path:
- /employee

### Customer Module
Base path:
- /api/customers

Customer routes are registered in src/app.ts.

## Customer Module Overview

The Customer module supports:
- Create customer
- Get customer by customerId
- Update customer by customerId
- Delete customer by customerId
- List customers

Controller implementation:
- src/controller/Customer.controller.ts

Routes implementation:
- src/routes/Customer.route.ts

Model and schema:
- src/model/Customer.model.ts

Interface contracts:
- src/interface/Customer.interface.ts

## Customer Entity Fields

Field: customerId
- Type: string
- Required: yes
- Rules: auto-generated UUID, unique, immutable

Field: firstName
- Type: string
- Required: yes
- Rules: trim, min length 2, max length 50

Field: lastName
- Type: string
- Required: yes
- Rules: trim, min length 2, max length 50

Field: email
- Type: string
- Required: yes
- Rules: lowercase, trim, unique, valid email format

Field: phone
- Type: string
- Required: no
- Rules: optional, must match + and 10-15 digits pattern

Field: status
- Type: enum
- Required: yes
- Allowed values: Active, Inactive
- Default: Active

Field: address
- Type: object
- Required: no
- If provided, required subfields:
	- line1
	- city
	- state
	- postalCode
	- country
- Optional subfield:
	- line2

Field: createdAt
- Type: Date
- System managed: yes

Field: updatedAt
- Type: Date
- System managed: yes

## Customer APIs

### 1) Create Customer
Method and path:
- POST /api/customers

### 2) Get Customer By ID
Method and path:
- GET /api/customers/:id

### 3) Update Customer
Method and path:
- PUT /api/customers/:id

### 4) Delete Customer
Method and path:
- DELETE /api/customers/:id

### 5) List Customers
Method and path:
- GET /api/customers

## Request Payload Examples

Create customer request:
{
	"firstName": "Sonali",
	"lastName": "Maind",
	"email": "sonali@cybage.com",
	"phone": "+919999999999",
	"status": "Active",
	"address": {
		"line1": "Hinjewadi Phase 1",
		"city": "Pune",
		"state": "Maharashtra",
		"postalCode": "411057",
		"country": "India"
	}
}

Update customer request:
{
	"firstName": "UpdatedName",
	"status": "Inactive"
}

Notes:
- customerId and createdAt are immutable and cannot be updated.

## Success Response Examples

Create success (201):
{
	"success": true,
	"message": "Customer created successfully.",
	"data": {
		"customerId": "uuid-value",
		"firstName": "Sonali",
		"lastName": "Maind",
		"email": "sonali@cybage.com",
		"phone": "+919999999999",
		"status": "Active",
		"address": {
			"line1": "Hinjewadi Phase 1",
			"city": "Pune",
			"state": "Maharashtra",
			"postalCode": "411057",
			"country": "India"
		},
		"createdAt": "timestamp",
		"updatedAt": "timestamp"
	}
}

Get by id success (200):
{
	"success": true,
	"message": "Customer fetched successfully.",
	"data": { "...customer object...": true }
}

Update success (200):
{
	"success": true,
	"message": "Customer updated successfully.",
	"data": { "...updated customer object...": true }
}

Delete success (200):
{
	"success": true,
	"message": "Customer deleted successfully.",
	"data": null
}

List success (200):
{
	"success": true,
	"message": "Customers fetched successfully.",
	"data": [ "...customer objects..." ]
}

## Validation Rules

Create-time required fields:
- firstName
- lastName
- email

Schema-level validation:
- firstName and lastName length constraints
- email format validation
- unique email
- status enum validation
- phone pattern validation
- address required subfields when address is provided

Immutable update constraints:
- customerId cannot be updated
- createdAt cannot be updated

## Error Response Examples

Missing required fields (400):
{
	"success": false,
	"message": "firstName, lastName, and email are required.",
	"error": null
}

Validation failure (400):
{
	"success": false,
	"message": "Validation failed.",
	"error": { "...mongoose validation details...": true }
}

Duplicate email (409):
{
	"success": false,
	"message": "Duplicate value violation.",
	"error": { "email": "duplicate@cybage.com" }
}

Customer not found (404):
{
	"success": false,
	"message": "Customer not found.",
	"error": null
}

Immutable field update attempt (400):
{
	"success": false,
	"message": "customerId and createdAt are immutable fields and cannot be updated.",
	"error": null
}

## Testing Instructions

Customer tests are in:
- src/__test__/Customer.controller.test.ts

Run all tests:
npm test

Current customer test coverage includes:
- Create customer
- Get customer by id
- Update customer
- Delete customer
- List customers
- Invalid email validation
- Duplicate email conflict
- Missing required fields validation

## Release Notes

### SCRUM-23: Documentation and Release Notes
- README expanded with full Customer module documentation.
- Added Customer entity field definitions.
- Added API contract details and payload examples.
- Added validation and error handling examples.
- Added customer testing instructions.

### Prior related implementation references
- SCRUM-20:
	- 4987607
	- 3d500c7
- SCRUM-21:
	- ed4a686
- SCRUM-22:
	- d2526ed
	- 002a4e7