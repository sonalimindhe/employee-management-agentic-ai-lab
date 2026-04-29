import mongoose from "mongoose";



export async function connectDB() {

    let con = await mongoose.connect('mongodb://localhost:27017/NodeJS_30_10_2025')
    console.log(con);

    if (con) {
        console.log("Database connected successfully");
    }
    else {
        console.log("Database connection failed");
    }
}

// export default connectDB;