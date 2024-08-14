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
      <div className="h-[90px] border-b"><Header /></div>
      <div>
        <div className="text-center font-medium p-10">Your Cart</div>
        <div className="mb-10">
          <table className="hidden lg:block w-max m-auto divide-y divide-gray-200 mb-10">
            {cartItems.length > 0 ? <thead className="bg-gray-100 bg-opacity-80">
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
            </thead> : <div className="text-xl font-bold text-gray-400">Cart is empty</div>}
            <tbody className="bg-gray-100 bg-opacity-60 shadow-sm">
              {cartItems?.map((cartItem) => (
                <tr key={cartItem.id}>
                  <td className="px-3 py-4 whitespace-nowrap flex items-center justify-evenly w-[200px]">
                    <CancelIcon
                      sx={{ cursor: "pointer" }}
                      onClick={() => handleOnDelete(cartItem.id)}
                    />
                    <Image
                      src={cartItem.source}
                      alt="image"
                      unoptimized
                      width={100}
                      height={100}
                    />
                  </td>
                  <td className="px-6 py-4 text-sm w-[350px]">
                    {cartItem.title}
                  </td>
                  <td className="px-6 py-4">${cartItem.price}</td>
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

          <div className="space-y-5 pb-10 lg:hidden">
            {cartItems?.map((cartItem) => (
              <div
                key={cartItem.id}
                className="w-[400px] sm:w-[600px] md:w-[750px] m-auto bg-gray-100 bg-opacity-60 shadow-sm"
              >
                <div className="border text-right p-2">
                  <CancelIcon
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleOnDelete(cartItem.id)}
                  />
                </div>
                <div className="border p-2">
                  <Image
                    src={cartItem.source}
                    alt="image"
                    unoptimized
                    width={100}
                    height={100}
                    className="m-auto"
                  />
                </div>
                <div className="flex items-center justify-between p-4 border text-[13px] md:text-[15px]">
                  <div className="font-medium">Product:</div>
                  <div>{cartItem.title}</div>
                </div>
                <div className="flex items-center justify-between p-4 border text-[13px] md:text-[15px]">
                  <div className="font-medium">Price:</div>
                  <div>${cartItem.price}</div>
                </div>
                <div className="flex items-center justify-between p-4 border text-[13px] md:text-[15px]">
                  <div className="font-medium">Quantity:</div>
                  <div>
                    <input
                      type="number"
                      value={cartItem.quantity}
                      min="1"
                      className="border-2 outline-0 w-[70px] p-1"
                      onChange={(e) => handleQuantity(e, cartItem.id)}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border text-[13px] md:text-[15px]">
                  <div className="font-medium">Subtotal:</div>
                  <div>${cartItem.price * cartItem.quantity}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="w-[400px] sm:w-[600px] md:w-[750px] lg:w-[930px] m-auto">
            <div className="border p-4 font-semibold">Cart totals</div>
            <div className="border flex items-center justify-between p-4 text-[13px] md:text-[15px]">
              <div className="font-medium">Subtotal:</div>
              <div>$438</div>
            </div>
            <div className="border flex items-center justify-between p-4 text-[13px] md:text-[15px]">
              <div className="font-medium">Discount:</div>
              <div>$20</div>
            </div>
            <div className="border flex items-center justify-between p-4 text-[13px] md:text-[15px]">
              <div className="font-medium">Total:</div>
              <div>$410</div>
            </div>
            <button className="p-4 my-2 w-full bg-green-600 text-white font-medium text-[13px] md:text-[15px]">BUY NOW</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
