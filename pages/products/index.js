import { useEffect, useState } from "react";
import Product from "../../components/Product";
import Layout from "@/components/Layout";

function Products() {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout title={"products"}>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-12">
        {products.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
    </Layout>
  );
}

export default Products;
