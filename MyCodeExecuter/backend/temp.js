module.exports.temp = async function(x){
    let p = await temp2(x);
    console.log("2 ",x);
    return p;
}
const temp2 = async(x)=>{
    for(var i=0;i<1000;i++){
        x = x+1;
    }
    console.log("1 ",x);
    return x;
}