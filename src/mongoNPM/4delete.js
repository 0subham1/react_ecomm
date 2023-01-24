const dbConnect = require("./mongodb");

const delete1 = async () => {
  let db = await dbConnect();

  let result = await db.deleteMany({ price: 600 });
  console.log(result);
};

delete1();
