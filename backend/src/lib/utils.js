import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';


export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId},JWT_SECRET,{
        expiresIn:JWT_EXPIRES_IN
    })

    res.cookie("jwt",token,{
        maxAge:7*24*60*60*1000,
        httpOnly:true,
        sameSite:"strict",
        secure:process.env.NODE_ENV !== "development"
    })

    return token
};


export const verifyToken = (token)=>{
    return new Promise((resolve,reject)=>{
        jwt.verify(token,JWT_SECRET,(err,decoded)=>{
            if (err) return reject(err);
            resolve(decoded);
        })
    })
}