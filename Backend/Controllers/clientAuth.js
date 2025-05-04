import bcrypt from 'bcrypt';
import client from '../Models/clientUserModal.js';

export const clientregisterController = async (req,res)=>{
    try{
        const {email,password} = req.body;
        // Check if user already exists
        const existingUser = await client.findOne({email});
        if(existingUser){
            return res.status(404).json({status:false,message:'User already exists'});
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password,10);  

        // Create a new user
        const newuser = new client({email,password:hashedPassword});
        await newuser.save();
        res.status(200).json({status:true,message:'User registered successfully'});
    }
    catch(error){
        console.error(error);
        res.status(500).json({status:false,message:'Server error'});    
    }
} 