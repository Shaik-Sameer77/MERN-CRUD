import { JWT_TOKEN_SECRET, StatusCode } from "../utils/constants.js";
import { jsonGenerate } from "../utils/helpers.js";
import Jwt from "jsonwebtoken"

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */

const AuthMiddleware =(req,res,next)=>{
    if(req.headers['auth']===undefined) {
        return res.json(jsonGenerate(StatusCode.AUTH_ERROR,"Access Denied"));
    }

    const token = req.headers['auth'];

    try{
        const decoded=Jwt.verify(token,JWT_TOKEN_SECRET);
        console.log(decoded);

        req.userId=decoded.userId;

        return next();

    } catch (error){
        return res.json(jsonGenerate(StatusCode.UNIPROCESSABLE_ENTITY,"Invalid Token"));
        // console.log("Error in auth middleware", error);
    }
}

export default AuthMiddleware