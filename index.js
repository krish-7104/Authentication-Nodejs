import express from "express";
import dotenv from "dotenv"
import authRouter from "./routes/auth.js";
import { connectToMongo } from "./database/config.js";
import cookieParser from "cookie-parser";
dotenv.config()

const app = express()
const Port = process.env.PORT || 3000;

connectToMongo()

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter)
app.use("/verify", authRouter)

app.listen(Port, () => {
    console.log(`Server Running on ${Port}`)
})