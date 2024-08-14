import React, { useEffect, useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Card from "./Card";

function Body() {
  const [loading, setLoading] = useState(false);
  const [addFlag, setAddFlag] = useState(false);
  const [flagText, setFlagText] = useState("");
  const [products, setProducts] = useState();
  const [offset, setOffset] = useState(0);

  const handleOnClick = (text) => {
    setAddFlag(true);
    setFlagText(text);

    setTimeout(() => {
      setAddFlag(false);
    }, 2000);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          // `https://api.escuelajs.co/api/v1/products?offset=0&limit=20`
          'https://api.pujakaitem.com/api/products'
        );
        const data = await res.json();
        // console.log(data)
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProduct();
  }, [offset]);

  return (
    <div className="w-full relative">
      {addFlag && (
        <div className="p-3 bg-green-200 sticky top-0 w-full z-[999] shadow-xl">
          {flagText}
        </div>
      )}

      {loading ? (
        <AutorenewIcon
          sx={{
            position: "absolute",
            left: "50%",
            zIndex: 999,
            margin: "50px 0",
            fontSize: "50px",
          }}
          className="animate-spin"
        />
      ) : (
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-y-10 place-items-center">
          {products?.map((product, index) => (
            <Card
              key={index}
              id={product.id}
              source={product.image}
              alternate={product.category}
              title={product.name}
              price={product.price}
              onClick={handleOnClick}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Body;
