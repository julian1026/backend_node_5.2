
const {nanoid}=require('nanoid');

const TABLE='post';

module.exports=function(injectStore){

    let store=injectStore;

    if(!store){
        store=require("../../../store/mysql");
    }

    const list=()=>{
        return store.list(TABLE);
    }

    const add=(id,data)=>{
        const post={
            id:data.id || nanoid(),
            text:data.text,
            user:id
        }
        return store.insert(TABLE,post);
    }
    const update=(id,data)=>{
        if(!data.id){
            return Promise.reject("peticion denegada!")
        }
        const post={
            id:data.id,
            text:data.text,
            user:id
        }
        return store.update(TABLE,post);
    }

    const query=(id)=>{
        let query={id:id}
       return store.query(TABLE,query,null);
    }
   
    return {
        list,add,update,query
    }
}






