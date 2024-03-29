const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const authValidation = async(req,res,next) => {
    const token = req.header("token");

    if(!token){
        return res.send({
            "success": false,
            "error_code": 404,
            "message": "Unauthorized User",
            "data": []
        });
    }

    const tokenWithoutPrefix = token.replace("Bearer ", "");

    try{
        const user = jwt.verify(tokenWithoutPrefix, process.env.JWT_SECRET_KEY);
        
        if(!user){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Invalid Token",
                "data": []
            });
        }

        req.user = user;
        next();

    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};

module.exports = {authValidation};