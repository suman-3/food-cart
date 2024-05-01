"use client";

import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { toast } from "sonner";
import { CartUpdateContext } from "../_context/CartUpdateContext";
import Link from "next/link";

const Cart = ({ cart }) => {
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);

  const CalculateCartAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total = total + item.price;
    });

    return total.toFixed(2);
  };

  const RemoveItemFromCart = (id) => {
    GlobalApi.DisconnectRestroFromUserCartItem(id).then((res) => {
      if (res) {
        GlobalApi.DeleteItemFromcart(id).then((res) => {
          setUpdateCart(!updateCart);
          toast("Item removed");
        });
      }
    });
  };
  return (
    <div>
      <div className="flex flex-col gap-4">
        {cart.length > 0 ? (
          <h2 className="font-bold">My Order</h2>
        ) : (
          <h2 className="font-bold">Cart Is Empty</h2>
        )}
        {cart &&
          cart.map((item, index) => {
            return (
              <div
                key={index}
                className="flex justify-between gap-8 items-center"
              >
                <div className="flex gap-2 items-center">
                  <Image
                    src={item.productImage}
                    alt={item.productName}
                    width={60}
                    height={40}
                    className="h-[40px] w-[60px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col gap-[1px]">
                    <h2 className="text-sm text-black">{item.productName}</h2>
                    {item?.resturant?.name && (
                      <h2 className="text-[12px] text-gray-800">
                        Restaurant: {item?.resturant?.name}
                      </h2>
                    )}
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <h2 className="font-bold"> ₹{item.price}</h2>
                  <X
                    onClick={() => RemoveItemFromCart(item.id)}
                    className="h-8 w-8 text-primary cursor-pointer border p-1 rounded-lg hover:bg-slate-200"
                  />
                </div>
              </div>
            );
          })}
        {cart.length > 0 && (
          <Link
            href={"/checkout?restaurent=" + cart[0]?.resturant?.name}
            className="w-full"
          >
            <Button className="w-full">
              Checkout ₹&nbsp;{CalculateCartAmount()}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Cart;
