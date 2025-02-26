import Head from "next/head";
import Link from "next/link";

function Layout(props) {
  const { title, children } = props;
  return (
    <>
      <Head>
        <title>{`${title} - Shopping`}</title>
      </Head>
      <div className="flex items-center justify-between flex-col h-screen">
        <div className="flex min-w-screen flex-col justify-between">
          <header>
            <nav className="flex items-center justify-between h-14 px-8 shadow-lg bg-white">
              <Link href={"/"}>
                <h1 className="text-2xl font-semibold">Shopping</h1>
              </Link>
              <ul className="flex gap-x-4">
                <Link href={"/products"}>
                  <li>Products</li>
                </Link>
                <Link href={"/cart"}>
                  <li>Cart</li>
                </Link>
                <Link href={"/login"}>
                  <li>Login</li>
                </Link>
              </ul>
            </nav>
          </header>
        </div>

        <main className="container m-auto px-4 mt-4">{children}</main>

        <footer className="flex items-center justify-center h-10 bg-gray-600 w-screen text-gray-100">
          Footer
        </footer>
      </div>
    </>
  );
}

export default Layout;
