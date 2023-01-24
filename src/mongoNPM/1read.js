const dbConnect =require("./mongodb")

const main=async ()=>{
let db =await dbConnect()
result=await db.find().toArray()
console.log(result,"result")
}

main()