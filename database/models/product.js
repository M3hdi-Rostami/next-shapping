import mongoose from "mongoose";
import slugify from "slugify";

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  slug: { type: String, unique: true },
  description: { type: String },
  cat: { type: String, default: "Books" },
  count: { type: Number, default: 0 },
  image: { type: String, default: "/images/image.png" },
});

// Middleware to generate slug before saving
productSchema.pre("save", function (next) {
  if (!this.slug || this.isModified("title")) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (!this.description) {
    this.description = `This ${this.cat.toLowerCase()} product is called "${
      this.title
    }" and is available for just $${this.price}.`;
  }
  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
export default Product;
