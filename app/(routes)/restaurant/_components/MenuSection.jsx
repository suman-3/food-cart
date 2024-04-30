"use client";

import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import MenuItemSkeleton from "./MenuItemSkeleton";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import { CartUpdateContext } from "@/app/_context/CartUpdateContext";

const MenuSection = ({ restaurant }) => {
  const [menuItemList, setMenuItemList] = useState([]); // used to store the menu items of the restaurant
  const { user } = useUser();

  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  useEffect(() => {
    restaurant?.menu && FilterMenu(restaurant?.menu[0]?.category);
  }, [restaurant]);

  const FilterMenu = (category) => {
    const result = restaurant?.menu?.filter(
      (item) => item.category === category
    );
    setMenuItemList(result[0]);
  };

  const addToCartHandler = (item) => {
    toast("Adding to cart");
    const data = {
      email: user?.primaryEmailAddress?.emailAddress,
      name: item?.name,
      description: item?.description,
      productImage: item?.productImage?.url,
      resturantSlug: restaurant?.slug,
      price: item?.price,
      
    };
    GlobalApi.AddToCart(data).then(
      (resp) => {
        setUpdateCart(!updateCart);
        toast("Added to cart");
      },
      (error) => {
        toast("Failed to add to cart");
      }
    );
  };

  return (
    <div>
      <div className="grid grid-cols-4 mt-2 pl-1">
        {restaurant?.menu ? (
          <div className="hidden md:flex flex-col gap-2 mr-10">
            {restaurant?.menu?.map((item, index) => (
              <Button
                variant="ghost"
                className="flex justify-start"
                onClick={() => FilterMenu(item?.category)}
                key={index}
              >
                {item?.category}
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-4 mt-6">
            <div className="w-[200px] h-[30px] bg-slate-200 rounded-md animate-pulse" />
            <div className="w-[200px] h-[30px] bg-slate-200 rounded-md animate-pulse" />
          </div>
        )}

        <div className="md:col-span-3 col-span-4">
          <h2 className="font-bold text-2xl">{menuItemList.category}</h2>
          {menuItemList?.menuItem ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              {menuItemList?.menuItem?.map((item, index) => (
                <div className="p-2 flex gap-3 items-center border rounded-xl hover:border-primary transition-all hover:bg-orange-50 duration-200">
                  <Image
                    src={item?.productImage?.url}
                    alt={item?.name}
                    width={120}
                    height={120}
                    className="object-cover w-[120px] h-[120px] rounded-xl"
                  />
                  <div className="flex flex-col gap-[1.5px]">
                    <h2 className="font-bold">{item?.name}</h2>
                    <h2 className="flex items-center">{item?.price}</h2>
                    <h2 className="text-sm text-gray-400 line-clamp-2">
                      {item?.description}
                    </h2>
                    <SquarePlus
                      className="mt-1 cursor-pointer"
                      onClick={() => addToCartHandler(item)}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <MenuItemSkeleton />
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
