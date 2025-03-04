import { CartContext } from "@/context/Cart";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Cookies from "js-cookie";
import { signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

function Layout(props) {
  const { title, children } = props;

  const { status, data: session } = useSession();

  const { state } = useContext(CartContext);
  const {
    cart: { cartItems },
  } = state;

  const [cartItemsCount, setCartItemsCount] = useState(0);

  function logoutHandler() {
    for (const [key, value] of Object.entries(Cookies.get())) {
      Cookies.remove(key);
    }
    signOut({ callbackUrl: "/login" });
  }

  useEffect(() => {
    setCartItemsCount(cartItems.reduce((acc, cur) => acc + cur.qty, 0));
  }, [cartItems]);

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
              <ul className="flex items-center gap-x-4">
                <Link href={"/products"}>
                  <li>Products</li>
                </Link>
                <Link href={"/cart"}>
                  <li>
                    Cart
                    {cartItemsCount > 0 && (
                      <span className="ml-1 rounded-xl bg-gray-200 text-gray-700 px-2 py-1 font-bold">
                        {cartItemsCount}
                      </span>
                    )}
                  </li>
                </Link>
                {status === "loading" ? (
                  "loading"
                ) : session?.user ? (
                  <Menu as={"div"} className="relative">
                    <MenuButton
                      as={"div"}
                      className="bg-gray-200 rounded-lg py-1 px-3 cursor-pointer"
                    >
                      {session?.user?.name}
                    </MenuButton>
                    <MenuItems className="absolute top-6 -right-4 p-4 w-24 bg-white border border-gray-100 flex flex-col gap-3">
                      <MenuItem
                        as={"div"}
                        className="cursor-pointer hover:text-blue-500"
                      >
                        profile
                      </MenuItem>
                      <MenuItem
                        as={"div"}
                        className="cursor-pointer text-red-400 hover:text-red-600"
                        onClick={logoutHandler}
                      >
                        logout
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                ) : (
                  <Link href={"/login"}>
                    <li>Login</li>
                  </Link>
                )}
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
