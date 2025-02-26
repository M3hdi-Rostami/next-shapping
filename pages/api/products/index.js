import path from "path";
import fs from "fs";

const handler = async (req, res) => {
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);
  res.status(200).json(data);
};

export default handler;
