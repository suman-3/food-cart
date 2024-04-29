"use client";

import React, { useEffect, useRef, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const CategoryList = () => {
  const listRef = useRef(null);
  const [categoryList, setCategoryList] = useState([]);

  const params = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    setSelectedCategory(params.get("category") || "all");
  }, [params]);

  useEffect(() => {
    getCategoryList();
  }, []);

  const getCategoryList = () => {
    GlobalApi.GetCategory().then((res) => {
      setCategoryList(res.categories);
    });
  };

  const ScrollRightHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };
  const ScrollLeftHandler = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="mt-10 relative">
      <div className="flex gap-4 overflow-auto scrollbar-hide" ref={listRef}>
        {categoryList &&
          categoryList.map((category, index) => (
            <Link
              key={index}
              className={`flex flex-col items-center gap-2 border p-3 rounded-lg min-w-28 hover:border-primary hover:bg-orange-50 cursor-pointer group ${
                selectedCategory === category.slug &&
                "border-primary text-primary bg-orange-50"
              }`}
              href={"?category=" + category.slug}
            >
              <img
                src={category.icon?.url}
                alt={category.name}
                className="w-10 h-10 rounded-full object-cover group-hover:scale-125 transition-all duration-200"
              />
              <h2 className="text-sm font-bold group-hover:text-primary">
                {category.name}
              </h2>
            </Link>
          ))}
      </div>
      <ArrowRight
        className="absolute -right-8 top-7 bg-gray-500 rounded-full text-white h-8  w-8 p-1 opacity-85 cursor-pointer"
        onClick={() => ScrollRightHandler()}
      />
      <ArrowLeft
        className="absolute -left-8 top-7 bg-gray-500 rounded-full text-white h-8  w-8 p-1 opacity-85 cursor-pointer"
        onClick={() => ScrollLeftHandler()}
      />
    </div>
  );
};

export default CategoryList;
