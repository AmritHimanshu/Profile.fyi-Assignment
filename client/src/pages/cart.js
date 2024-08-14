import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { setCount } from "./features/cartSlice";
import Image from "next/image";
import Header from "./components/Header";
import CancelIcon from "@mui/icons-material/Cancel";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const items = localStorage.getItem("items");
    let itemsObj = [];
    if (items == null) itemsObj = [];
    else itemsObj = JSON.parse(items);
    dispatch(setCount(itemsObj.length));
  }, [cartItems]);

  useEffect(() => {
    let itemsObj = [];
    const items = localStorage.getItem("items");
    if (items == null) itemsObj = [];
    else itemsObj = JSON.parse(items);
    setCartItems(itemsObj);
  }, []);

  const handleOnDelete = (id) => {
    let itemsObj = [];
    const items = localStorage.getItem("items");
    if (items == null) itemsObj = [];
    else itemsObj = JSON.parse(items);
    const updatedItemsObj = itemsObj.filter((item) => item.id !== id);
    localStorage.setItem("items", JSON.stringify(updatedItemsObj));
    setCartItems(updatedItemsObj);
  };

  const handleQuantity = (e, id) => {
    console.log(typeof e.target.value);
    let itemsObj = [];
    const items = localStorage.getItem("items");
    if (items == null) itemsObj = [];
    else itemsObj = JSON.parse(items);

    if (e.target.value >= 0) {
      const updatedItems = itemsObj.map((item) =>
        item.id === id ? { ...item, quantity: parseInt(e.target.value) } : item
      );
      localStorage.setItem("items", JSON.stringify(updatedItems));
      setCartItems(updatedItems);
    } else {
      const updatedItems = itemsObj.map((item) =>
        item.id === id ? { ...item, quantity: 1 } : item
      );
      localStorage.setItem("items", JSON.stringify(updatedItems));
      setCartItems(updatedItems);
    }
  };

  return (
    <div className="relative">
      <Head>
        <title>Shop karo</title>
      </Head>
      <Header />
      <div className="pt-10">
        <div className="text-center font-medium p-10">Your Cart</div>
        <div>
          <table className="min-w-max m-auto divide-y divide-gray-200">
            <thead className="bg-gray-100 bg-opacity-80">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"></th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-100 bg-opacity-60 shadow-sm">
              {cartItems?.map((cartItem, index) => (
                <tr key={cartItem.id}>
                  <td className="px-3 py-4 whitespace-nowrap flex items-center justify-evenly w-[200px]">
                    <CancelIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleOnDelete(cartItem.id)}
                    />
                    <Image
                      src={cartItem.source}
                      alt=""
                      unoptimized
                      width={100}
                      height={10}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm w-[350px]">
                    {cartItem.title}
                  </td>
                  <td className="px-6 py-4">
                    ${cartItem.price}
                  </td>
                  <td className="px-6 py-4 w-[150px]">
                    <input
                      type="number"
                      value={cartItem.quantity}
                      min="1"
                      className="border-2 outline-0 w-[100px]"
                      onChange={(e) => handleQuantity(e, cartItem.id)}
                    />
                  </td>
                  <td className="px-6 py-4">
                    ${cartItem.price * cartItem.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Cart;
