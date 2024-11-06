// import Image from "next/image";
import React from "react";

function HeroSlider() {
  return (
    <div className="w-full h-screen flex justify-center align-middle">
      {/* <Image src={"/banner.png"} width={10000} height={10000} alt={"banner"} /> */}
      <div className="text-5xl font-extrabold">
        From Concept to Creation <br />{" "}
        <span className="text-red-800">Expert 3D Printing Solutions</span>
      </div>
    </div>
  );
}

export default HeroSlider;
