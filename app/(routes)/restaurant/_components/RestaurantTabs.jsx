import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSection from "./MenuSection";
import ReviewSection from "./ReviewSection";
import AboutDetails from "./AboutDetails";

const RestaurantTabs = ({ restaurant }) => {
  return (
    <Tabs defaultValue="category" className="w-full mt-7">
      <TabsList>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="review">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="category">
        <MenuSection restaurant={restaurant} key={restaurant?.name} />
      </TabsContent>
      <TabsContent value="about">
        <AboutDetails restaurant={restaurant} />
      </TabsContent>
      <TabsContent value="review">
        <ReviewSection restaurant={restaurant} />
      </TabsContent>
    </Tabs>
  );
};

export default RestaurantTabs;
