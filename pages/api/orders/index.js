import db from "@/database/db";
import Order from "@/database/models/order";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import Product from "@/database/models/product";

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const { user } = session;

  try {
    await db.connect();
    await Order.deleteMany();

    const { orderItems } = req.body;

    const products = await Promise.all(
      orderItems.map(async ({ slug, qty: quantity }) => {
        const productId = await Product.findOne({ slug }, "_id");
        return { productId, quantity };
      })
    );

    const newOrder = new Order({
      user: user._id,
      products,
      ...req.body,
    });

    await newOrder.save();

    res.status(201).send(newOrder);
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await db.destroyed();
  }
}
export default handler;
