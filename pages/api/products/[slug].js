import db from "@/database/db";
import Product from "@/database/models/product";

const handler = async (req, res) => {
  const { slug } = req.query;

  await db.connect();
  const data = await Product.findOne({ slug }).lean();

  res.status(200).json(data);
};

export default handler;
