import Layout from "@/components/Layout";
import RequireAuth from "@/hoc/RequireAuth";

function Index() {
  return (
    <Layout title="checkout shopping">
      <div>checkout</div>
    </Layout>
  );
}

export default RequireAuth(Index);
