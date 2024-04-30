import Image from "next/image";
import Link from "next/link";
import React from "react";

const BusinessItem = ({ business }) => {
  const CalculateRating = () => {
    let total = 0;
    let count = 0;
    business?.reviews.forEach((item) => {
      total = total + item.star;
      count++;
    });

    const result = total / count;
    return result ? result.toFixed(1) : 5;
  };
  return (
    <Link
      href={"/restaurant/" + business?.slug}
      className="p-3 rounded-xl cursor-pointer group"
    >
      <img
        src={business?.banner?.url}
        alt={business?.name}
        className="w-full h-[150px] rounded-md object-cover"
      />
      <div className="mt-1">
        <h2 className="font-bold text-lg">{business?.name}</h2>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image src="/star.png" alt="star" width={14} height={14} />
            <label className="text-gray-400 text-sm">{CalculateRating()}</label>
            <div className="flex gap-1 items-center">
              <h2 className="text-gray-400 text-sm">
                {business?.restroType[0]}
              </h2>
            </div>
          </div>
          <Link
            href={"?category=" + business?.categories[0].slug}
            className="text-sm text-gray-700 underline "
          >
            {business?.categories[0].name}
          </Link>
        </div>
      </div>
    </Link>
  );
};

export default BusinessItem;
