import jwt from "jsonwebtoken";
import{ User} from "../models/User.js";

// Generate jwt token
const GenerateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn : "1h"});
};

//Register User
export const registerUser = async (req,res) =>{

};

//login User
export const loginUser = async (req,res) =>{
    
};

//Register User
export const getUserInfo = async (req,res) =>{
    
};

