"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const ACHIEVEMENTS = [
  "/achivement/img1.jpg",
  "/achivement/img2.jpg",
  "/achivement/img3.jpg",
  "/achivement/img4.jpg",
  "/achivement/img5.jpg",
  "/achivement/img1.jpg",
  "/achivement/img2.jpg",
  "/achivement/img3.jpg",
  "/achivement/img4.jpg",
  "/achivement/img5.jpg",
  "/achivement/img1.jpg",
  "/achivement/img2.jpg",
  "/achivement/img3.jpg",
  "/achivement/img4.jpg",
  "/achivement/img5.jpg",
  "/achivement/img1.jpg",
  "/achivement/img2.jpg",
  "/achivement/img3.jpg",
  "/achivement/img4.jpg",
  "/achivement/img5.jpg",
  "/achivement/img1.jpg",
  "/achivement/img2.jpg",
  "/achivement/img3.jpg",
  "/achivement/img4.jpg",
  "/achivement/img5.jpg",
  "/achivement/img1.jpg",
  "/achivement/img2.jpg",
  "/achivement/img3.jpg",
  "/achivement/img4.jpg",
  "/achivement/img5.jpg",
  "/achivement/img1.jpg",
  "/achivement/img2.jpg",
  "/achivement/img3.jpg",
  "/achivement/img4.jpg",
  "/achivement/img5.jpg",
  "/achivement/img1.jpg",
  "/achivement/img2.jpg",
  "/achivement/img3.jpg",
  "/achivement/img4.jpg",
  "/achivement/img5.jpg",
  "/achivement/img1.jpg",
  "/achivement/img2.jpg",
  "/achivement/img3.jpg",
  "/achivement/img4.jpg",
  "/achivement/img5.jpg",
];

function splitArray<T>(array: T[], numParts: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < array.length; i++) {
    const index = i % numParts;
    if (!result[index]) {
      result[index] = [];
    }
    result[index].push(array[i]);
  }
  return result;
}

interface AchievementColumnProps {
  achievements: string[];
  className?: string;
  achievementClassName?: (index: number) => string;
  animationDuration?: number;
}

function AchievementColumn({
  achievements,
  className,
  achievementClassName,
  animationDuration = 4,
}: AchievementColumnProps) {
  const columnRef = useRef<HTMLDivElement>(null);
  const [columnHeight, setColumnHeight] = useState(0);

  useEffect(() => {
    if (columnRef.current) {
      setColumnHeight(columnRef.current.scrollHeight / 2);
    }
  }, []);

  return (
    <div className={cn("relative h-full overflow-hidden", className)}>
      <motion.div
        ref={columnRef}
        animate={{
          y: [-columnHeight, 0],
        }}
        transition={{
          y: {
            repeat: Infinity,
            repeatType: "loop",
            duration: animationDuration,
            ease: "linear",
          },
        }}
      >
        <div className="space-y-8 py-4">
          {achievements.concat(achievements).map((imgSrc, index) => (
            <Achievement
              key={index}
              className={achievementClassName?.(index)}
              imgSrc={imgSrc}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

interface AchievementProps {
  imgSrc: string;
  className?: string;
}

function Achievement({ imgSrc, className }: AchievementProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={cn(
          "rounded-2xl bg-white p-4 shadow-xl shadow-slate-900/5 transition-transform duration-300 ease-in-out hover:scale-105",
          className
        )}
      >
        <Image
          src={imgSrc}
          alt="Achievement"
          width={300}
          height={400}
          className="w-full h-auto object-cover rounded-xl"
        />
      </div>
    </motion.div>
  );
}

function AchievementGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.4 });
  const columns = splitArray(ACHIEVEMENTS, 3);

  return (
    <div
      ref={containerRef}
      className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3"
    >
      {isInView && (
        <>
          <AchievementColumn
            achievements={columns[0]}
            achievementClassName={(index) =>
              cn({
                "md:hidden": index >= columns[0].length,
              })
            }
            animationDuration={210}
          />
          <AchievementColumn
            achievements={columns[1]}
            className="hidden md:block"
            achievementClassName={(index) =>
              cn({
                "lg:hidden": index >= columns[1].length,
              })
            }
            animationDuration={118}
          />
          <AchievementColumn
            achievements={columns[2]}
            className="hidden lg:block"
            animationDuration={212}
          />
        </>
      )}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100" />
    </div>
  );
}

export function AchievementShowcase() {
  return (
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl text-center mb-12">
        Our Achievements
      </h2>
      {/* <img
        aria-hidden="true"
        src="/achievements-background.png"
        alt=""
        className="absolute select-none hidden xl:block -left-32 top-1/3"
      /> */}
      <AchievementGrid />
    </div>
  );
}
