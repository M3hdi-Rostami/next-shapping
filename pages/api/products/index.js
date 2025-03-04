import Product from "@/database/models/product";
import db from "@/database/db";
import products from "@/database/mock-data/products";

const handler = async (req, res) => {
  await db.connect();
  await Product.deleteMany();
  await Product.insertMany(products);
  const data = await Product.find().lean();
  res.status(200).json(data);
};

export default handler;
