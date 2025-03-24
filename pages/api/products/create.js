import db from "@/database/db";
import Product from "@/database/models/product";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { title, price, count } = req.body;

    await db.connect();

    await Product.create({
      title,
      price,
      count,
    });

    res.status(201).json({ message: "successfully created of new product" });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: `Internal Server Error ${error.message}` });
  } finally {
    await db.destroyed();
  }
};

export default handler;
