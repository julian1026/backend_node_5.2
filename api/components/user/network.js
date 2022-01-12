const express=require('express');
const response=require('../../../network/response');
const controller=require('./index');
const secure=require('./secure');
const router=express.Router();


router.get('/',list);
router.get('/:id',getUser);
router.post('/',insert);
router.post('/follow/:id',secure("follow"), follow)
router.put('/',secure("update"),insert);
router.delete('/:id',remove)
router.get('/:id/following',following)


function list(req,res,next){
    controller.list()
    .then(data=>{
        response.success(req,res,data,200)
    }).catch(next)
}
function follow(req,res,next){
    controller.follow(req.user.id , req.params.id)
    .then(data=>{
        response.success(req,res,data,200);
    }).catch(next)
}

function following(req,res,next){
    controller.following(req.params.id)
    .then(data=>{
        response.success(req,res,data,200);
    }).catch(next);
}

function getUser(req,res,next){
    controller.get(req.params.id)
    .then(data=>{
        response.success(req,res,data,200);
    }).catch(next)
}

function  insert(req,res,next){
    controller.post(req.body)
    .then(data=>{
        response.success(req,res,data,201);
    }).catch(next)
}

function remove(req,res,next){
    controller.del(req.params.id)
    .then(data=>{
        response.success(req,res,data,201);
    }).catch(next)
}


module.exports=router;