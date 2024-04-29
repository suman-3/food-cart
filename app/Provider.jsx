import React from "react";
import Header from "./_components/Header";

const Provider = ({ children }) => {
  return (
    <div className="lg:px-10  relative">
      <Header />
      {children}
    </div>
  );
};

export default Provider;
