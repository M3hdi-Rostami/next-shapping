import Layout from "@/components/Layout";
import RequireAuth from "@/hoc/RequireAuth";

function Home() {
  return (
    <Layout title={"Home page"}>
      <h1>Home page</h1>
    </Layout>
  );
}

export default RequireAuth(Home);
