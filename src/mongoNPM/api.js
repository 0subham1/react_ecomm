const dbConnect = require("./mongodb");
const mongodb=require("mongodb")
const express = require("express");
const app = express();

app.use(express.json());

app.get("/", async (req, res) => {
  let db = await dbConnect();
  let data = await db.find().toArray();
  res.send(data);
});

app.post("/", async (req, res) => {
  let db = await dbConnect();
  let result = await db.insertOne(req.body);
  res.send(result);
});

app.put("/:name", async (req, res) => {
  let db = await dbConnect();
  let result = await db.updateOne(
    { name: req.params.name},
    { $set: req.body}
  );
  res.send( "UPDATED");
});

app.delete("/:id",async (req,res)=>{
  let db =await dbConnect()
  let result=await db.deleteOne({_id:new mongodb.ObjectId(req.params.id)})
  res.send(result)
})

app.listen(5000);
