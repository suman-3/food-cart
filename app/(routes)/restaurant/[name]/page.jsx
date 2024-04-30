"use client";

import GlobalApi from "@/app/_utils/GlobalApi";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Intro from "../_components/Intro";
import Tabs from "../_components/RestaurantTabs";
import RestaurantTabs from "../_components/RestaurantTabs";

const RestaurantDetails = () => {
  const param = usePathname(); // used to get the current path name from the url
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    GetRestaurantDetails(param.split("/")[2]);
  }, []);

  const GetRestaurantDetails = (restroSlug) => {
    GlobalApi.GetBusinessDetail(restroSlug).then((res) => {
      console.log(res);
      setRestaurant(res.resturant);
    });
  };
  return (
    <div>
      <Intro restaurant={restaurant} />
     <RestaurantTabs restaurant={restaurant}/>
    </div>
  );
};

export default RestaurantDetails;
