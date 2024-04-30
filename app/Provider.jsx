import React from "react";
import Header from "./_components/Header";
import { Toaster } from "@/components/ui/sonner";

const Provider = ({ children }) => {
  return (
    <div className="lg:px-10  relative">
      <Header />
      {children}
      <Toaster />
    </div>
  );
};

export default Provider;
