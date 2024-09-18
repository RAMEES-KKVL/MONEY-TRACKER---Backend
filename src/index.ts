import express from "express"
import dotenv from "dotenv"
import authRouter from "./router/authRouter"
import userRouter from "./router/userRouter"
import cors from "cors"
import bodyParser from "body-parser"
import mongoose from "mongoose"
dotenv.config()
const port = process.env.PORT

const app = express()  
app.use(cors())
app.use(bodyParser.urlencoded({ extended : true }))
app.use(express.json())

app.use("/auth", authRouter)
app.use("/user", userRouter)
 
mongoose.connect(process.env.MONGO_URL as string)
.then(() => {
    console.log('mongodb connected succesfully');
    app.listen(port, ()=> console.log("Success at", port))
})
.catch((error) => {
    console.log(error);
})  