const respon = rootRequire('/app/libs/respon');
const func = rootRequire('/app/libs/func');
const jwt = require('jsonwebtoken');
const config = rootRequire('/app/config');
const moment = require('moment');

const sessionChecker=async(req,res,next)=>{

    const data={
        tkn:'tkn',
        id:'req.session.user.id',
        email:'req.session.user.email',
        role:'req.session.user.role',
        name:'req.session.user.name',
    }
    req.session.user = data;
    next();

    // if (req.session.user && req.cookies.user_sid) {
    //     const token=req.session.user.tkn;
    //     if (!token){
    //         return respon.err400('No token provided.',null,res);
    // 	}

    //     jwt.verify(token,config.jwt,async(err,decoded)=>{
    //         if (err){
    //             res.redirect('/logout');
    //         }
    //         const upSes={
    //             id:req.session.user.id,
    //             email:req.session.user.email,
    //             role:req.session.user.role,
    //             name:req.session.user.name,
    //         }
    //         req.session.user = await func.updateSession(upSes)
    //         next();
    //     });
    // } else {
    //     res.redirect('/login');
    // }
};

module.exports=sessionChecker;