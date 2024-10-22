const auth=(req,res,next)=>{
    const token="xyz";
    const isAdminAuth=token=== "xyz"
    if(!isAdminAuth){
        res.status(402).send("unauthorised user")
    }
    else{
       next();
    }
}

module.exports={auth}