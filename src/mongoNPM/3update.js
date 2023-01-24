const dbConnect = require("./mongodb");

const update = async () => {
  let db = await dbConnect();

  const result =await db.updateMany(
    {
      category: "smartPhone",
    },
    {
      $set: {
        category: "lappy",
      },
    }
  );
  console.log(result,"result")
};

update()