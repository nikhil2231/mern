import mongoose from "mongoose";

import dotenv from 'dotenv';
 dotenv.config();

const ConnectMongo = async () => {
    try {
        const mongoCon = await mongoose.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            dbName: "ProTree"


        }


        );
        console.log(`Connected to ${mongoCon.connection.host}`);

    }
    catch (err) {
        console.log(err.message);
        process.exit(1);

    }
}

export default ConnectMongo;