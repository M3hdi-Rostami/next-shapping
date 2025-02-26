import path from "path";
import fs from "fs";

const handler = async (req, res) => {
  console.log("🚀 ~ handler ~ req:", req.body);
  const filePath = path.join(process.cwd(), "data", "products.json");
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData);

  const { slug } = req.query;
  const product = data.find((product) => product.slug === slug);

  res.status(200).json({ product });
};

export default handler;
