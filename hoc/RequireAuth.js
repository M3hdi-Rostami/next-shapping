import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

function RequireAuth(Component) {
  return function AuthenticatedComponent(props) {
    const { status } = useSession();
    const router = useRouter();

    if (status === "loading") {
      return (
        <Layout title={"Home page"}>
          <div className="flex items-center justify-center h-full w-full text-3xl font-bold bg-white rounded-lg p-6">
            Loading...
          </div>
        </Layout>
      );
    }

    if (status === "unauthenticated") {
      if (typeof window !== "undefined") {
        router.push("/login");
      }
      return null;
    }
    return <Component {...props} />;
  };
}

export default RequireAuth;
