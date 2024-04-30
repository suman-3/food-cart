"use client";

import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Header = () => {
  const { user, isSignedIn } = useUser();

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
          <div className="flex items-center gap-1">
            <ShoppingCart />
            <label className="mt-[1.7px] px-[10px] py-[1.7px] rounded-full bg-slate-200 flex items-center justify-center">
              0
            </label>
          </div>
          <UserButton />
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
