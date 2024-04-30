import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSection from "./MenuSection";

const RestaurantTabs = ({ restaurant }) => {
  return (
    <Tabs defaultValue="category" className="w-full mt-7">
      <TabsList>
        <TabsTrigger value="category">Category</TabsTrigger>
        <TabsTrigger value="about">About</TabsTrigger>
        <TabsTrigger value="review">Reviews</TabsTrigger>
      </TabsList>

      <TabsContent value="category">
        <MenuSection restaurant={restaurant} />
      </TabsContent>
      <TabsContent value="about">about</TabsContent>
      <TabsContent value="review">review</TabsContent>
    </Tabs>
  );
};

export default RestaurantTabs;
