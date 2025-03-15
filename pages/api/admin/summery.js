import Order from "@/database/models/order";
import User from "@/database/models/user";
import db from "@/database/db";
import { getSession } from "next-auth/react";
import Product from "@/database/models/product";

async function handler(req, res) {
  try {
    const session = await getSession({ req });
    const { user } = session;
    if (!user || !user?.isAdmin) {
      return res.status(401).json({ message: "access denied" });
    }

    await db.connect();

    const usersCount = await User.countDocuments();
    const ordersCount = await User.countDocuments();
    const productsCount = await Product.countDocuments();

    return res.status(200).json({ usersCount, ordersCount, productsCount });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await db.destroyed();
  }
}

export default handler;
