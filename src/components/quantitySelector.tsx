"use client";

import { MinusIcon, PlusIcon } from "lucide-react";

import React, { useState } from "react";

function QuantitySelector({ quantity }: { quantity: number }) {
  const [value, setValue] = useState(0);

  function valueminus() {
    if (value > 0) {
      setValue(value - 1);
    }
  }
  function valueplus() {
    if (value < quantity) {
      setValue(value + 1);
    }
  }
  return (
    <div className="flex gap-3">
      <MinusIcon onClick={() => valueminus()} />
      <input
        value={value}
        type="number"
        className="w-[60px] border border-black rounded-xl text-center"
      />
      <PlusIcon onClick={() => valueplus()} />
    </div>
  );
}

export default QuantitySelector;
