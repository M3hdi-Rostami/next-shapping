import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Header from "./Header";
import Footer from "./Footer";

function Layout(props) {
  const { title, children, mainClass = "container m-auto px-4 mt-4" } = props;

  return (
    <>
      <Head>
        <title>{`${title} - Shopping`}</title>
      </Head>
      <ToastContainer position="top-left" />
      <div className="flex justify-between flex-col min-h-screen">
        <Header />
        <main className={mainClass}>{children}</main>
        <Footer />
      </div>
    </>
  );
}

export default Layout;
