const jwt=require('jsonwebtoken');
const conf=require("../config");
const error=require('../utils/error');


let secret=conf.jwt.secret;

const sign=(data)=>{
    return jwt.sign(data,secret);
}

function verify(token){
    return jwt.verify(token,secret);
}

const check={
    own:function(req,owner){
        const decoded=decodeHeader(req);
        //comprobar si viene token
        if(decoded.id!==owner){
            throw error('no puedes hacer esto',401);
        }
    },
    logged:function(req){
        const decoded=decodeHeader(req);
    }
}

function getToken(auth){
    if(!auth){
        throw new Error("No viene token");
    }
    if(auth.indexOf("Bearer ") === -1){
        throw new Error("Formato Invalido");
    }
    let token=auth.replace("Bearer ","");
    return token;
}

function decodeHeader(req){
    const authorization=req.headers.authorization || '';
    const token=getToken(authorization);
    const decoded=verify(token);
    req.user=decoded;

    return decoded;
}
module.exports={sign,check};