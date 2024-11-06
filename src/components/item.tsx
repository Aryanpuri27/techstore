import { Minus, Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";
import QuantitySelector from "./quantitySelector";

function Item() {
  return (
    <div className="flex flex-col rounded-lg overflow-hidden shadow-2xl shadow-slate-800 pb-3">
      <Image src={"/stage.jpeg"} width={250} height={250} alt={"image"} />

      <div className="flex flex-col p-3">
        <span>⭐⭐⭐⭐⭐</span>
        <span className="text-3xl">Qudcoptor</span>
        <span>Rs 1500</span>
      </div>
      <div>
        <form className="flex justify-between px-4">
          <QuantitySelector quantity={2} />
          <ShoppingCart />
        </form>
      </div>
    </div>
  );
}

export default Item;
