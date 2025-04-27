import User from "../models/user.model";
import { verifyToken } from "../lib/utils";

async function protectRoute(req,res,next) {
    try {
        let token = req.cookies.jwt

        const authHeader = req.headers.authorization;

        if (!token || !authHeader?.startsWith('Bearer')) {
            token = authHeader.split(' ')[1]
        }

        if (!token) {
            return res.status(401).json({
                status: 'fail',
                message: "Unauthorized - No Token Provided"
            }); 
        }

        const decoded = verifyToken(token)

        if (!decoded) {
            return res.status(401).json({
                status:"fail",
                msg:"Unauthorized - No Token Provided"
            })
        }

        const user = await User.findById(decoded.userId).select('-password')

        if (!user) {
            return res.status(404).json({
                status: 'fail',
                message: "User not found"
            });
        }

        req.user = user
        next()

    } catch (error) {
        console.log("error in protect route ", error.message);
        res.status(511).json({
            msg:"internal server error"
        })
    }
}

export default protectRoute;