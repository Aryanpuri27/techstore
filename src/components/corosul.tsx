"use client";
import Image from "next/image";
import React, { useState } from "react";

function Img({ links }: { links: Array<string> }) {
  const [id, setId] = useState(0);
  return (
    <div className="gap-4 flex flex-col  justify-end md:h-auto">
      <div className="w-full rounded-xl overflow-hidden  shadow-[0px_0px_46px_-9px_rgba(0,_0,_0,_0.8)] dark:shadow-[0px_10px_30px_0px_rgba(255,_182,_193,_0.3)] ">
        <Image src={links[id]} width={600} height={600} alt={"img"} />
      </div>
      <div className="flex gap-2 flex-wrap">
        {links.map((li: string, index: number) => (
          <Image
            src={li}
            width={80}
            height={80}
            alt={"img"}
            key={index}
            className=" hover:cursor-pointer"
            onClick={() => setId(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Img;
