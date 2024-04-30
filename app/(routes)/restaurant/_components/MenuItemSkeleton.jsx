import React from "react";

const MenuItemSkeleton = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="w-[160px] h-[30px] bg-slate-200 rounded-md animate-pulse" />
      <div className="col-span-10 w-full flex gap-10">
        <div className="w-[320px] h-[120px] bg-slate-200 rounded-xl animate-pulse" />
        <div className="w-[320px] h-[120px] bg-slate-200 rounded-xl animate-pulse" />
      </div>
    </div>
  );
};

export default MenuItemSkeleton;
