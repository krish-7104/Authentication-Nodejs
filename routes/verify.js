import { Router } from "express";
import { resetPasswordHandler } from "../controller/verify.js";

const verfiyRouter = Router();

verfiyRouter
    .post("/reset-password", resetPasswordHandler)

export default verfiyRouter;
