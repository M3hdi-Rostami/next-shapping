import Product from "@/database/models/product";
import db from "@/database/db";
import products from "@/database/mock-data/products";

const handler = async (req, res) => {
  try {
    await db.connect();
    await Product.deleteMany();
    await Product.insertMany(products);
    const data = await Product.find().lean();
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ handler ~ error:", error);
  }
};

export default handler;
