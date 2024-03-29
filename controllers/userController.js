const dotenv = require("dotenv");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

dotenv.config();

const createUser = async (req, res) => {

    const temp = await User.findOne({email: req.body.email});
    if(temp){
        return res.send({
            "success": false,
            "error_code": 404,
            "message": "User already exists, go to login",
            "data": []
        });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const user = new User({
        userName: req.body.userName,
        email: req.body.email.toLowerCase(),
        password: hashedPassword
    });

    try {
        const newUser = await User.create(user);
        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully created a user",
            "data": [newUser]
        });
    } catch (err) {
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const deleteUser = async (req, res) => {
    const loggedInUser = await User.findOne({_id: req.user._id});

    try{
        const id = req.params.id;
        const user = await User.findById(id);

        if(!user){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "User does not exist",
                "data": []
            });
        }

        if(loggedInUser._id.toString() !== id.toString()){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "You cannot delete some other user",
                "data": []
            });
        }

        await User.deleteOne(user);
        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully deleted the user",
            "data": []
        });

    } catch(err){
        return res.status(200).send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};

const allUsers = async(req,res) => {
    try{
        const users = await User.find();
        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully fetched all users",
            "data": users
        });
    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const singleUser = async(req,res) => {
    try{
        let id = req.params.id;
        const user = await User.findById(id);

        if(!user){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "User does not exist",
                "data": []
            });
        }

        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Successfully fetched the user",
            "data": [user]
        });
    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const loginUser = async(req,res) => {
    
    try{
        userName = req.body.userName;
        const user = await User.findOne({email: req.body.email});
        if(!user){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "User does not exist, go to create user",
                "data": []
            });
        }

        const result = await bcrypt.compare(req.body.password, user.password);
        if(!result){
            return res.send({
                "success": false,
                "error_code": 404,
                "message": "Incorrect password",
                "data": []
            });
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
        res.header({token: token});

        return res.status(200).send({
            "success": true,
            "error_code": null,
            "message": "Login successful",
            "data": [user]
        });
    } catch(err){
        return res.send({
            "success": false,
            "error_code": 500,
            "message": err.message,
            "data": []
        });
    }
};


const logoutUser = async(req,res) => {

    
    return res.status(200).send({
        "success": true,
        "error_code": null,
        "message": "Logout successful",
        "data": []
    });
};


module.exports = {
    createUser,
    allUsers,
    singleUser,
    deleteUser,
    loginUser,
    logoutUser
}