import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
const protectRoute =async (req, res, next) => { 
    try {
        const token = req.cookies.jwtToken;
        if (!token) {
            return res.status(401).json({error: "Unauthorized-No token provided"});
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded) {
            return res.status(401).json({error: "Unauthorized-Token verification failed"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(401).json({error: "Unauthorized-No user found"});
        }
        req.user = user;
        next();
    } catch (err) {
        console.log("Error in protectRoute middleware: ", err.message);
        res.status(401).json({error: "Not authorized, token failed"});
    }

}

export default protectRoute;