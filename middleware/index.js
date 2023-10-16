import jwt from "jsonwebtoken"

export const checkUserHandler = async (req, res, next) => {
    const token = req.cookies.token;
    const data = jwt.decode(token, process.env.JWTSECRET)
    req.user = data
    next()
}