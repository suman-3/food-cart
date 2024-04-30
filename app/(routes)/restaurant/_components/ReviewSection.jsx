"use client";

import { useEffect, useState } from "react";
import { Rating as ReactRating } from "@smastrom/react-rating";
import React from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import GlobalApi from "@/app/_utils/GlobalApi";
import { toast } from "sonner";
import ReviewList from "./ReviewList";

const ReviewSection = ({ restaurant }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState();
  const { user } = useUser();

  const [reviewList, setReviewList] = useState();

  useEffect(() => {
    restaurant && getReviewList();
  }, [restaurant]);

  const handleSubmit = () => {
    const data = {
      email: user?.primaryEmailAddress.emailAddress,
      profileImage: user?.imageUrl,
      userName: user?.fullName,
      star: rating,
      reviewText: reviewText,
      RestroSlug: restaurant.slug,
    };

    GlobalApi.AddNewReview(data).then((res) => {
      toast("Review Added");
      res && getReviewList();
    });
  };

  const getReviewList = () => {
    GlobalApi.GetRestaurentReviewes(restaurant.slug).then((res) => {
      setReviewList(res?.reviews);
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 mt-4 gap-7">
      <div className="flex flex-col gap-2 p-5 border rounded-lg shadow-lg">
        <h2 className="font-bold text-lg">Add Your Review</h2>
        <ReactRating
          style={{ maxWidth: 100 }}
          value={rating}
          onChange={setRating}
        />
        <Textarea
          className="resize-none mt-3"
          onChange={(e) => setReviewText(e.target.value)}
        />
        <Button
          className="mt-1"
          disabled={rating == 0 || !reviewText}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </div>
      <div className="col-span-2">
        <ReviewList reviewList={reviewList} />
      </div>
    </div>
  );
};

export default ReviewSection;
