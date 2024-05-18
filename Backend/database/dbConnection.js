import mongoose from "mongoose";


export const dbConnection = () =>{
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "MERN_STACK_2"
    }).then(()=>{
        console.log("Connected to database")
    })
    .catch(err=>{
            console.log(`some error occured while connecting a database : ${err}`)
    })
   
}