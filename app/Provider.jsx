"use client";

import React, { useState } from "react";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";
import { CartUpdateContext } from "./_context/CartUpdateContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const Provider = ({ children }) => {
  const [updateCart, setUpdateCart] = useState(false);
  return (
    <PayPalScriptProvider
      options={{
        clientId: "AWdBTfeVNSu0ydWMt6o_jdm9fN7ObkW9YnjuHMdjB0nBZLG2zeAnpTpRfE-1Zav6WUjSFojHcmbj-Sdr",
      }}
    >
      <CartUpdateContext.Provider value={{ updateCart, setUpdateCart }}>
        <div className="lg:px-10  relative mb-20">
          <Header />
          {children}
          <Toaster />
        </div>
      </CartUpdateContext.Provider>
    </PayPalScriptProvider>
  );
};

export default Provider;
