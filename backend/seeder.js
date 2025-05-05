import mongoose from "mongoose";
import dotenv from 'dotenv'
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import ConnectMongo from "./config/database.js";


dotenv.config();

ConnectMongo();



//insert all the data into the database at once

const importData = async () => {
    try {

        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;

        const sampleProducts = products.map((product) => {
            return {
                ...product, user: adminUser

            }
        })

        await Product.insertMany(sampleProducts);

        console.log("Data imported Successfully")
        process.exit();

    }
    catch (err) {
        console.log(err.message)
        process.exit(1);

    }




}


//Delete all the data from database at once

const deleteData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();
        process.exit();
    }

    catch(err) {
        console.log(err.message);
    }

}


if(process.argv[2] === '-d') {
    deleteData();
} 
else {
    importData();
}