import { Router } from "express";
import { forgetPasswordHandler, loginHandler, logoutHandler, registerHandler, resetPasswordHandler } from "../controller/auth.js";

const authRouter = Router();

authRouter
    .post("/login", loginHandler)
    .post("/register", registerHandler)
    .post("/forget-password", forgetPasswordHandler)
    .post("/verify/:id", resetPasswordHandler)
    .get("/logout", logoutHandler);


export default authRouter;
