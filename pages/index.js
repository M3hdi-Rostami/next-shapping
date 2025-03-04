import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [router, status]);

  if (status === "loading") {
    return (
      <Layout title={"Home page"}>
        <p>Loading...</p>
      </Layout>
    );
  }

  return (
    <Layout title={"Home page"}>
      {status === "loading" ? <p>Loading...</p> : <h1>Home page</h1>}
    </Layout>
  );
}
