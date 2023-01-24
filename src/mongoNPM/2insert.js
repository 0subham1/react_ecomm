const dbConnect = require("./mongodb");

const insert = async () => {
  let db = await dbConnect();
  // insertOne, insertMany or bulkWrite
  const result = await db.insertMany([

    {
        name: "n88",
        price: 600,
        brand: "vivo",
        category: "smartPhone",
      },
      {
        name: "n88",
        price: 600,
        brand: "iPhone",
        category: "smartPhone",
      }

  ]);
  console.log(result);
};

insert();
