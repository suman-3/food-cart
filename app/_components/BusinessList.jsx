"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import GlobalApi from "../_utils/GlobalApi";
import BusinessItem from "./BusinessItem";
import BusinessItemSkelton from "./BusinessItemSkelton";

const BusinessList = () => {
  const params = useSearchParams();
  const [category, setCategory] = useState("all");
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    params && setCategory(params.get("category") || "all");
    params && getBusinessList(params.get("category") || "all");
  }, [params]);

  const getBusinessList = (category_) => {
    setLoading(true);
    GlobalApi.GetBusiness(category_).then((res) => {
      setBusinessList(res?.resturants);
      setLoading(false);
    });
  };

  return (
    <div className="mt-5">
      {businessList.length > 0 ? (
        <>
          <h2 className="capitalize font-bold text-2xl">
            Popular {category} Restaurants
          </h2>
          <h2 className="font-bold text-primary mt-1">
            {businessList?.length} Results
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-3">
            {!loading
              ? businessList.map((resturants, index) => (
                  <div>
                    <BusinessItem key={index} business={resturants} />
                  </div>
                ))
              : [1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
                  <BusinessItemSkelton />
                ))}
          </div>
        </>
      ) : (
        <h2 className="w-full flex items-center justify-center mt-4 text-2xl  py-2 rounded-md border cursor-pointer">
          No Resturants Found
        </h2>
      )}
    </div>
  );
};

export default BusinessList;
