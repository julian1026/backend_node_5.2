
const db={
    'user':[
        {id:"1", name:'julian',surname:'calambas',age:24},
        {id:"2", name:'daniel',surname:'ortiz',age:25},
    ]
}

const list=async(table)=>{
    if(!db[table]){
        db[table]=[];
    }
    return db[table];
}

const get= async(table,id)=>{
    const col= await list(table);
    const res= await col.filter(item=>item.id===id) || null;
    return res;
}

const upsert= async (tabla,data)=>{
    if(!db[tabla]){
        db[tabla]=[];
    }
    db[tabla].push(data);
    // console.log(db);
}

const remove=async(table,id)=>{
    const data=await list(table);
    const filter= await data.find(item=>item.id==id);
    if(!filter){
      return Promise.reject('data no found')
    }else{
        db[table]=data.filter(item=>item.id!=id);
    }
}

const query=async(table,data)=>{
    const cont=await list(table);
    const keys=Object.keys(data);
    const key =keys[0];
    const res=cont.filter(item=>item[key]==data[key])[0] || null;
    return res;
}

module.exports={list,get,upsert,remove,query}

