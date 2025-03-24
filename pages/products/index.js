import BreadCrumps from "@/components/BreadCrumps";
import Product from "../../components/Product";
import Layout from "@/components/Layout";
import CreateProductForm from "@/components/CreateProductForm";

function Products(props) {
  const { products } = props;

  return (
    <Layout title={"products"}>
      <BreadCrumps pageName="products" />

      <CreateProductForm />

      <div className="flex gap-10 flex-wrap">
        {products.map((item) => {
          return <Product key={item._id} item={item} />;
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
