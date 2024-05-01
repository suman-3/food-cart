"use client";

import { Button } from "@/components/ui/button";
import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { CartUpdateContext } from "../_context/CartUpdateContext";
import GlobalApi from "../_utils/GlobalApi";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Cart from "./Cart";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, isSignedIn } = useUser();
  const { updateCart, setUpdateCart } = useContext(CartUpdateContext);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (user) {
      GetUserCart(user?.primaryEmailAddress.emailAddress);
    }
  }, [user, updateCart]);

  const GetUserCart = () => {
    GlobalApi.GetUserCart(user?.primaryEmailAddress?.emailAddress).then(
      (res) => {
        console.log(res);
        setCart(res.userCarts);
      }
    );
  };

  return (
    <div className="flex py-4 px-10 justify-between shadow-sm w-full  z-20">
      <Link href="/">
        <Image src="/logo/food.png" alt="logo" width={100} height={100} />
      </Link>
      <div className="flex border px-4 py-2 rounded-lg bg-gray-200 w-96">
        <input type="text" className="bg-transparent w-full outline-none" />
        <Search className="opacity-60" />
      </div>
      {isSignedIn ? (
        <div className="flex items-center gap-5">
          <Popover>
            <PopoverTrigger asChild>
              <div className="flex items-center gap-1 cursor-pointer">
                <ShoppingCart />
                <label className="mt-[1.7px] px-[10px] py-[1.7px] rounded-full bg-slate-200 flex items-center justify-center">
                  {cart?.length}
                </label>
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-full">
              <Cart cart={cart} />
            </PopoverContent>
          </Popover>

          {/* <UserButton />*/}

          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="p-1 bg-slate-200 cursor-pointer rounded-full">
                <Image
                  src={user?.imageUrl}
                  alt={user?.fullName}
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href={"/user"}>
                <DropdownMenuItem>Profile</DropdownMenuItem>
              </Link>
              <Link href={"/user/my-orders"}>
                <DropdownMenuItem>My Order</DropdownMenuItem>
              </Link>
              <DropdownMenuItem>
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (
        <>
          <SignInButton mode="modal">
            <Button variant="outline" className="border border-red-400">
              Login
            </Button>
          </SignInButton>
        </>
      )}
    </div>
  );
};

export default Header;
