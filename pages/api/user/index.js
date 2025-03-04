import User from "../../../database/models/user";
import db from "../../../database/db";
import users from "../../../database/mock-data/users";

async function handler(req, res) {
  await db.connect();

  await User.deleteMany();

  await User.insertMany(users);

  res.send({ message: "user added." });
}

export default handler;
