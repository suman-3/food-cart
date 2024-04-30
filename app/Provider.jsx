"use client";

import React, { useState } from "react";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartUpdateContext } from "./_context/CartUpdateContext";

const Provider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
      <div className="lg:px-10  relative mb-20">
        <Header />
        {children}
        <Toaster />
      </div>
    </CartUpdateContext.Provider>
  );
};

export default Provider;
