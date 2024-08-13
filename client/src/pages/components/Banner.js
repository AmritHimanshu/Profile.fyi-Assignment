import React from "react";
import Header from "./Header";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

function Banner() {

  const handleScroll = () => {
    window.scrollBy({
      top: 300,
      behavior: 'smooth',
    });
  };

  return (
    <div className='h-[90vh] bg-[url("/images/banner.jpg")] bg-cover text-white relative cursor-default'>

      <Header />

      <div className="w-full h-full bg-neutral-800 bg-opacity-70 flex items-center justify-center">
        <div className="p-10 text-center w-max m-auto space-y-10">
          <div className="text-[12px] sm:text-[18px] tracking-widest">WELCOME TO THE SHOPKARO</div>
          <div className="text-[1rem] sm:text-[2rem] lg:text-[3rem] tracking-wider">Experience Shopping Like Never Before at shopkaro!</div>
        </div>
      </div>

      <ArrowDownwardIcon sx={{position:'absolute',bottom:'20px',left:'50%',zIndex:999,cursor:'pointer'}} className="hover:scale-125 hover:translate-y-3" onClick={handleScroll}/>

    </div>
  );
}

export default Banner;
