const express=require("express");
const controller=require("./index");
const response=require("../../../network/response");

const router=express.Router();

router.post('/login',function(req,res){
    controller.login(req.body.username,req.body.password)
    .then(data=>{
        response.success(req,res,data,200);
    }).catch(err=>{
        console.log(err)
        response.error(req,res,'informacion invalida',400);
    })
})

module.exports=router;