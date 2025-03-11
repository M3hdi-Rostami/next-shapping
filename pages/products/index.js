import BreadCrumps from "@/components/BreadCrumps";
import Product from "../../components/Product";
import Layout from "@/components/Layout";

function Products(props) {
  const { products } = props;

  return (
    <Layout title={"products"}>
      <BreadCrumps pageName="products" />

      <div className="flex gap-10 flex-wrap">
        {products.map((item) => {
          return <Product key={item.id} item={item} />;
        })}
      </div>
    </Layout>
  );
}

export default Products;

export async function getServerSideProps() {
  const response = await fetch("http://localhost:3000/api/products");
  const products = await response.json();

  return {
    props: { products },
  };
}
