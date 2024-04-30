import { MapPin } from "lucide-react";
import Image from "next/image";
import React from "react";

const Intro = ({ restaurant }) => {
  return (
    <div>
      {restaurant?.banner?.url ? (
        <div>
          <img
            src={restaurant?.banner?.url}
            className="w-full h-[230px] object-cover rounded-xl"
            alt="Restaurant Banner"
          />
        </div>
      ) : (
        <div className="h-[230px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
      )}
      {restaurant?.name && restaurant?.address ? (
        <>
          <h2 className="text-3xl font-bold mt-2">{restaurant.name}</h2>
          <div className="flex items-center gap-2 mt-2">
            <Image src={"/star.png"} width={20} height={20} alt="star" />
            <label className="text-gray-500">4.5&nbsp;(56)</label>
          </div>
          <h2 className="text-gray-500 mt-2 flex gap-2 -ml-1 items-center">
            <MapPin />
            {restaurant?.address}
          </h2>
        </>
      ) : (
        <div className="my-8 flex flex-col gap-2">
          <div className="w-[230px] h-[30px] bg-slate-200 animate-pulse rounded-md" />
          <div className="w-[220px] h-[20px] bg-slate-200 animate-pulse rounded-md" />
        </div>
      )}
    </div>
  );
};

export default Intro;
