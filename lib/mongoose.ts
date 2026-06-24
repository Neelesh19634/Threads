import mongoose from 'mongoose'

let isConnected = false 

export const connectToDB = async() => {
    mongoose.set('strictQuery', true);

    if(!process.env.MONGODB_URL) return console.log("MONGODB_URI not found");

    if(isConnected) return console.log('Already connect to MongoDB');

    try {
        await mongoose.connect(process.env.MONGODB_URL,{
            dbName: "Threads",
        })
        isConnected = true;
        console.log("Connect to MONGODB")
    } catch (error) {
        console.log(error);
    }

}