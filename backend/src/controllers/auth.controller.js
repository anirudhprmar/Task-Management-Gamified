import User from "../models/user.model";
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js" 
import { signupSchema , loginSchema} from "../types.js";

export const signup = async(req,res)=>{
    try {
        const validatedInput = signupSchema.safeParse(req.body) // validate the inputs
        
        const existingUser = await User.findOne({
            $or:[
                {email:validatedInput.email},
                {username:validatedInput.username}
            ]
        })
        
        if(existingUser){
            return res.status(400).json({
                msg:existingUser.email === validatedInput.email ? "Email already exits" : "Username already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);


        const newUser = await User.create({
            username,
            email,
            password:hashedPassword,
            bio:"mention about you"
        })

        const token = generateToken(newUser._id,res);

        return res.status(200).json({
            status:"success",
            token,
            data:{
                user:{
                    id:newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    profilePic:newUser.profilePic,
                    bio:newUser.bio
                }
            }
        })
    } catch (error) {
        console.log("Error in signup controller",error.message);
        
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const login = async(req,res)=>{
    try {
        const {email,password} = loginSchema.safeParse(req.body)
        const user = await User.findOne({ email });
        
        if (!user || !(await bcrypt.compare(password,user.password))) {
            return res.status(401).json({
                status:"fail",
                msg:"Invalid Credentials"
            })
        }

        const token = generateToken(user.id,res);

        res.status(200).json({
            status:"success",
            token,
            data:{
                user:{
                    id:user._id,
                    username: user.username,
                    email: user.email,
                    profilePic:user.profilePic,
                    bio:user.bio
                }
            }
        })

    } catch (error) {
        console.log("error in login ", error.message);
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const logout = ()=>{
    try {
        res.clearCookie('jwt')

        return res.status(200).json({
            status:"success",
            msg:"Logged out sucessfully"
        });
    } catch (error) {
        console.log("error in logout", error.message)
        res.status(500).json({message:"Internal Server Error"})
    }
}

export const updateProfile = async(req,res)=>{
//username, email, password, profilepic, bio
try {
    const {profilePic,bio,email,username} = req.body;
    const userId = req.user.id

    const existingUser = await User.findById(userId);
    if (!existingUser) {
        return res.status(404).json({msg:"User not found"})
    }

    if (!bio || !email || !username ) {
        return res.status(400).json({msg:"This field is required"})
    }

    const updatedFields = {
        bio,
        email,
        username
    }

    if (profilePic) {
        const uploadResponse = await cloudinary.uploader.upload(profilePic);
        updatedFields.profilePic = uploadResponse.secure_url
    }


    const updatedUser = await User.findByIdAndUpdate(
        userId,
        updatedFields,
        {new:true}
    )


    res.status(200).json({
        status: "success",
        data: {
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                profilePic: updatedUser.profilePic,
                bio: updatedUser.bio
            }
        }
    });

} catch (error) {

    console.log("error in update profile",error);
    res.status(500).json({message:"Internal Server Error"})
}
}

export const checkAuth = (req,res)=>{
  try {
    res.status(200).json(req.user)
  } catch (error) {
    console.log('Error in checkAuth controller:',error.message);
    res.status(500).json({message:"Internal server error"})
  }
}

export const deleteProfile = async(req,res) => {
    try {
        const userId = req.user.id
        const deletedUser = await User.findByIdAndDelete(userId)

        if(!deletedUser){
            return res.status(404).json({
                msg:"User not found"
            })
        }

        res.clearCookie('jwt');

        res.status(200).json({
            msg:"User deleted successfully"
        })

    } catch (error) {
        console.log('Error in delete profile:',error.message);
    res.status(500).json({message:"Internal server error"})
    }
}