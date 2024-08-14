import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { selectCount } from "../../features/cartSlice";
import MenuIcon from "@mui/icons-material/Menu";
import CancelIcon from "@mui/icons-material/Cancel";

function Header() {
  // Redux count for showing number of products in the cart
  const count = useSelector(selectCount);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Function to toggle the menu visibility
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Effect to add/remove no-scroll class to body
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isMenuOpen]);

  return (
    <div className="bg-transparent absolute w-full">
      <div className="p-7 flex items-center justify-between">
        <div className="text-lg tracking-widest">Shopkaro</div>
        <div className="hidden sm:block">
          <ul className="flex items-center justify-evenly space-x-12">
            <Link href="/">
              <li className="cursor-pointer">Home</li>
            </Link>
            <li className="cursor-pointer">About</li>
            <li className="cursor-pointer">Contact</li>
            <Link href="/cart">
              <li className="cursor-pointer">
                Cart{" "}
                <span className="bg-red-600 rounded-full text-sm px-1">
                  {count}
                </span>
              </li>
            </Link>
          </ul>
        </div>
        <div className="block sm:hidden">
          <MenuIcon sx={{ cursor: "pointer" }} onClick={toggleMenu} />

          {isMenuOpen && (
            <div className="absolute right-0 top-0 w-[100vw] h-[100vh] bg-gray-300 bg-opacity-90 text-black z-[100]">
              <div className="text-right p-5">
                <CancelIcon
                  sx={{ fontSize: "35px", cursor: "pointer" }}
                  onClick={toggleMenu}
                />
              </div>
              <ul className="md:text-xl h-full">
                <Link href="/">
                  <li className="cursor-pointer p-5" onClick={toggleMenu}>
                    Home
                  </li>
                </Link>
                <hr className="border-1 border-black" />
                <li className="cursor-pointer p-5" onClick={toggleMenu}>
                  About
                </li>
                <hr className="border-1 border-black" />
                <li className="cursor-pointer p-5" onClick={toggleMenu}>
                  Contact
                </li>
                <hr className="border-1 border-black" />
                <Link href="/cart">
                  <li className="cursor-pointer p-5" onClick={toggleMenu}>
                    Cart{" "}
                    <span className="bg-red-600 rounded-full text-sm px-1">
                      {count}
                    </span>
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
