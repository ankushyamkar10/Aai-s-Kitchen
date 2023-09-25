import React, { useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import StarRatings from "react-star-ratings";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

import axios from "axios";

const getReviews = async () => {
  const res = await axios.get(
    "https://aais-kitchen-backend.onrender.com/api/review"
  );

  if (res.data) return res.data;
};

const Review = () => {
  const [reviews, setReviews] = useState();

  useEffect(() => {
    getReviews().then((res) => setReviews(res));
  }, [setReviews]);

  if (!reviews) {
    return;
  }

  return (
    <Carousel
      autoPlay={true}
      showThumbs={false}
      showStatus={false}
      interval={4000}
      infiniteLoop={true}
      showIndicators={false}
      showArrows={false}
      className="relative"
    >
      {reviews.map((review) => {
        return (
          <div
            key={review._id}
            className=" px-2 md:px-12 py-4 md:py-8 grid items-center"
            style={{ gridTemplateColumns: "65px 1fr" }}
          >
            <div className="flex flex-col items-center gap-1 ">
              <img src={avatar} alt={avatar} className="h-16" />
              <div className="text-sm">{review.name}</div>
            </div>
            <div className="text-sm ml-4">
              <span>{review.review}</span>
              <span className="block text-xs">
                <StarRatings
                  rating={review.rating}
                  starDimension="16px"
                  starSpacing="0px"
                  starEmptyColor="#bdbbbb"
                  starRatedColor="#FFD93D"
                />{" "}
                ({review.rating} / 5)
              </span>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default Review;
