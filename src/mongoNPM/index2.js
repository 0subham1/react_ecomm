const {MongoClient}=require("mongodb")
const client=new MongoClient("mongodb://127.0.0.1:27017/")

const getData=async()=>{
  let result=await client.connect()
  let db=result.db("eCommerce")
  let collection=db.collection("Products")
  let response=await collection.find().toArray()
  console.log(response)
}

getData()