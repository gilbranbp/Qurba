const jwt = require('jsonwebtoken');
const config = rootRequire('/app/config');
const respon = rootRequire('/app/libs/respon');


verifyToken=(req,res,next)=>{
    const token=req.headers.token;
    if (!token){
		return respon.err400('No token provided.',null,res);
		// return res.redirect('/login')
	}

    // console.log(jwt)
    jwt.verify(token,config.jwt,(err,decoded)=>{
		// console.log(decoded);
        if (err){
			return respon.err400(err,null,res);
		}
		req.usrid=decoded.usrid;
		req.r=decoded.r;
        next();
    });
};

module.exports=verifyToken;

