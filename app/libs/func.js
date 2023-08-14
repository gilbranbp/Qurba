'use strict';

const config = rootRequire('/app/config');
const jwt = require('jsonwebtoken');

exports.int2ip=(ipInt)=>{
    return ( (ipInt>>>24) +'.' + (ipInt>>16 & 255) +'.' + (ipInt>>8 & 255) +'.' + (ipInt & 255) );
};

exports.ip2int=(ip)=>{
    return ip.split('.').reduce(function(ipInt, octet) { return (ipInt<<8) + parseInt(octet, 10)}, 0) >>> 0;
};

exports.updateSession=async(upSes)=>{

    // console.log('===>upppfunc',upSes)
    // update token
    const payload={
        id:upSes.id,
        role:upSes.role
    }

    const options={
        expiresIn:'1h',
        algorithm:'HS512'
    }

    const tkn=await jwt.sign(payload,config.jwt,options);

    const data={
        tkn:tkn,
        id:upSes.id,
        email:upSes.email,
        role:upSes.role,
        name:upSes.name,
    }
    return data
};

