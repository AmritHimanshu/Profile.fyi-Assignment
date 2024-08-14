import { useEffect } from "react";
import Head from "next/head";
import { useDispatch } from "react-redux";
import { setCount } from "../features/cartSlice";
import Banner from "./components/Banner";
import Body from "./components/Body";

export default function Home() {

  const dispatch = useDispatch();

  // For updating no of products in the cart
  useEffect(()=>{
    const items = localStorage.getItem("items");
    let itemsObj = [];
    if (items == null) itemsObj = [];
    else itemsObj = JSON.parse(items);
    dispatch(setCount(itemsObj.length));
  },[]);

  return (
    <div>
      <Head>
        <title>Shop karo</title>
      </Head>
      <div className="">
        <Banner />
        <Body />
      </div>
    </div>
  );
}
