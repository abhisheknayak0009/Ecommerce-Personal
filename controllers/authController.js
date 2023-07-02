import userModel from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helper/authHelper.js";
import JWT from 'jsonwebtoken';

export const registerController = async(req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body
        if(!name) {
            return res.send({message: 'Name is required'})
        }
        if(!email) {
            return res.send({message: 'email is required'})
        }
        if(!password) {
            return res.send({message: 'password is required'})
        }
        if(!phone) {
            return res.send({message: 'phone is required'})
        }
        if(!address) {
            return res.send({message: 'address is required'})
        }
         if(!answer) {
            return res.send({message: 'answer is required'})
        }
        // check user
        const existingUser = await userModel.findOne({email})
        
        // exisiting user
        if(existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered, Please try again'
            })
        }
        //register user
        const hashedPassword = await hashPassword(password)
        // To save
        const user = await new userModel({name, email, password: hashedPassword, phone, address, answer}).save()
        res.status(201).send({
            success: true,
            message: 'User registerd successfully',
            user,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Registration',
            error
        })
    }
};

// POST LOGIN
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid email or password',
            })    
        }
        //check user
        const user = await userModel.findOne({email})
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'Email is not registered',
            })    
        }
        const match = await comparePassword(password, user.password)
        if(!match) {
            return res.status(200).send({
                success: false,
                message: 'Invalid password',
            })    
        }
        // token
        const token = await JWT.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        res.status(200).send({
            success: true,
            message: 'Login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            },
            token,
        });   
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
}

// forgot password controller
export const forgotPasswordController = async (req, res) => {
    try {
        const {email, answer, newPassword} = req.body;
        if(!email) {
            res.status(400).send({
            message: 'Email is required',
        });
        }
        if(!answer) {
            res.status(400).send({
            message: 'Filling the question is required',
        });
        }
        if(!newPassword) {
            res.status(400).send({
            message: 'New Password is required',
        });
        }
        // checks
        const user = userModel.findOne({email, answer});
        // validation
        if(!user) {
            res.status(404).send({
            success: false,
            message: 'Wrong Email or Answer',
        });
        }
        const hashed = await hashPassword(newPassword);
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success: true,
            message: 'Password reset successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Something',
            error
        });
    }
}

// test controller
export const testController = (req, res) => {
    res.send("Protected routes");
}