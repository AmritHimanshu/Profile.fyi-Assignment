import React, { useEffect, useState } from "react";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Card from "./Card";

function Body() {

  const [loading, setLoading] = useState(false); // Loading icon flag before fetching products
  const [addFlag, setAddFlag] = useState(false); // Added or removed product from/to cart icon notification flag
  const [flagText, setFlagText] = useState(""); // Added or removed text for notification
  const [products, setProducts] = useState(); // Store products fetched through API

  // Fuction to show notification on adding or removing products from the cart
  const handleOnClick = (text) => {
    setAddFlag(true);
    setFlagText(text);

    setTimeout(() => {
      setAddFlag(false);
    }, 2000);
  };

  // Fetching products
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
  }, []);

  return (
    <div className="w-full relative">
      {/* Notification for adding or removing products to/from cart */}
      {addFlag && (
        <div className="p-3 bg-green-200 sticky top-0 w-full z-[999] shadow-xl">
          {flagText}
        </div>
      )}

      {/* Loading icon */}
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
