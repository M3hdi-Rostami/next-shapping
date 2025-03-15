import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React from "react";

function RequireAdmin(Component) {
  return function CheckAdminComponent(props) {
    const { status, data: session } = useSession();
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

    if (!session.user?.isAdmin) {
      if (typeof window !== "undefined") {
        return (
          <Layout title={"Access Denied"}>
            <h1 className="text-red-400 bg-white px-6 py-4 rounded-lg flex items-center justify-center">
              Access Denied.
            </h1>
          </Layout>
        );
      }
      return null;
    }

    return <Component {...props} />;
  };
}

export default RequireAdmin;
