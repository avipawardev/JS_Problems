const jwt = require('jsonwebtoken');

const authMiddleware=(req,res,next)=>{
    try {
        let token = req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({message: 'Unauthorized'});
    }
    const decoded = jwt.verify(token, 'shhh');
    req.user = decoded;
    next();
    } catch (error) {
        console.log(error,"something went wrong")
    }
};

module.exports = authMiddleware;