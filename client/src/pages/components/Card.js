import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../features/cartSlice";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutorenewIcon from "@mui/icons-material/Autorenew";

function Card({ id, source, alternate, title, price, onClick }) {

  const dispatch = useDispatch();

  const [isInCart, setIsInCart] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = () => {
    setAddingToCart(true);

    const items = localStorage.getItem("items");
    let itemsObj = [];
    if (items == null) itemsObj = [];
    else itemsObj = JSON.parse(items);
    itemsObj.push({ id, source, alternate, title, price, quantity:1 });
    localStorage.setItem("items", JSON.stringify(itemsObj));
    dispatch(increment());

    setAddingToCart(false);
    setIsInCart(true);
    (() => {
      onClick("Added to cart");
    })();
  };

  const handleRemoveToCart = () => {
    setAddingToCart(true);

    let itemsObj = [];
    const items = localStorage.getItem("items");
    if (items == null) return;
    itemsObj = JSON.parse(items);
    const updatedItemsObj = itemsObj.filter((item) => item.id !== id);
    localStorage.setItem("items", JSON.stringify(updatedItemsObj));
    dispatch(decrement());

    setAddingToCart(false);
    setIsInCart(false);
    (() => {
      onClick("Removed from cart");
    })();
  };

  useEffect(() => {
    const items = localStorage.getItem("items");
    let itemsObj;
    if (items == null) {
      setIsInCart(false);
      return;
    }
    itemsObj = JSON.parse(items);
    const item = itemsObj.find((item) => item.id === id);
    if (item) {
      setIsInCart(true);
    }
  }, [id]);

  return (
    <div className="bg-gray-100 bg-opacity-60 shadow-sm w-max rounded-md overflow-hidden relative hover:scale-105 duration-200 cursor-pointer">
      <div className="absolute right-0 z-50 m-[5px] cursor-pointer">
        {!addingToCart ? (
          !isInCart ? (
            <FavoriteBorderIcon
              sx={{
                color: "white",
              }}
              onClick={handleAddToCart}
            />
          ) : (
            <FavoriteIcon
              sx={{
                color: "red",
              }}
              onClick={handleRemoveToCart}
            />
          )
        ) : (
          <AutorenewIcon
            sx={{
              color: "white",
            }}
            className="animate-spin"
          />
        )}
      </div>

      <Image
        src={source}
        alt={alternate}
        unoptimized
        width={300}
        height={300}
      />
      <div className="p-2">
        <div className="text-[12px] p-1 text-white rounded-sm bg-green-600 w-max">
          4.7☆
        </div>
        <div className="text-[13px] py-2">{title}</div>
        <div className="text-[15px] font-semibold">$ {price}</div>
      </div>
    </div>
  );
}

export default Card;
