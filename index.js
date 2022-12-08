import express from "express"
import cors from "cors"
import connection from "./config/db.js"
import authRouter from "./controllers/controller.js";
import cookieParser from "cookie-parser"
import checkAuth from "./middlewares/authMiddleware.js";
import dotenv from "dotenv";
import { fileURLToPath } from 'url';  //for cyclic deploy
import userModel from "./models/userModel.js"
import mongoose from "mongoose";
import path from "path";


const user = userModel

dotenv.config()


const app = express();
mongoose.set('strictQuery', true);
app.set('view engine', 'ejs');






app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(cors({
//     credentials: true,
//     origin: "http://localhost:3000",
// }))
app.use(cors())
app.use(cookieParser())


app.get("/api", (req, res) => {
    console.log("inside api")
    res.send(res)
})

app.get("/app", (req, res)=>{
    res.send("thiis is api")
})



app.use("/api/auth", authRouter)

//check Authorized user
app.post("api/check", checkAuth, (err, res) => {
    
    if (res) {
        console.log("auth passed")
        console.log()
        res
            .status(201)
            .send({success:true, message: "Authorized" })
    }
    else {
        console.log(err)
        res.send(err)
    }
})

const __filename = fileURLToPath(import.meta.url);

// 👇️ "/home/john/Desktop/javascript"
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname,"./client_side/build")))
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "client_side/build/index.html"))
})

//post api for addition
app.post("/add", async(req, res)=>{
    const {num1, num2} = req.body.input
    console.log("into api", req.body)
    console.log(num1)
    try {
        const sum = parseInt(num1) + parseInt(num2)
        console.log(sum)
        // await user.save()
    
        return res
            .status(201)
            .send({sum: sum, message:"the sum is calculated"})

    } catch (error) {
        return res.status(500).send(error.message)
    }
})


// console.log(port)
const port = 8080
app.listen(port, async (req, res) => {
    try {
        await connection;
        console.log("connected to database")
    } catch (error) {
        console.log(error.message)
    }
})

