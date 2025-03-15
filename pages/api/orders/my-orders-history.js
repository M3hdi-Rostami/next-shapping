import Order from "@/database/models/order";
import { authOptions } from "../auth/[...nextauth]";
import db from "@/database/db";
import { getServerSession } from "next-auth";

async function handler(req, res) {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { user } = session;
  
  try {
    await db.connect();

    const orders = await Order.find(
      { user: user._id },
      'orderItems totalPrice isPaid isDelivered createdAt' // Select only needed fields
    )
      .populate('user', 'name')
      .sort({ createdAt: -1 }) // Sort by most recent first
      .lean();

    return res.status(200).json(orders);
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    await db.destroyed();
  }
}

export default handler;
