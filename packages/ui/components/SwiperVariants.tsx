"use client";

import React from "react";
import Swiper, { SwiperProps } from "./Swiper";

// Hero Swiper - للصور الرئيسية
export const HeroSwiper: React.FC<SwiperProps> = (props) => (
  <Swiper
    {...props}
    effect="fade"
    showProgress={true}
    showPlayPause={true}
    pauseOnHover={true}
    className="h-96 md:h-[500px] lg:h-[600px]"
  />
);

// Card Swiper - للبطاقات
export const CardSwiper: React.FC<SwiperProps> = (props) => (
  <Swiper
    {...props}
    effect="slide"
    showArrows={true}
    showIndicators={true}
    autoPlay={false}
    className="py-8"
  />
);

// Gallery Swiper - للمعرض
export const GallerySwiper: React.FC<SwiperProps> = (props) => (
  <Swiper
    {...props}
    effect="coverflow"
    showArrows={true}
    showIndicators={true}
    autoPlay={false}
    className="h-80 md:h-96"
  />
);

// Testimonial Swiper - للشهادات
export const TestimonialSwiper: React.FC<SwiperProps> = (props) => (
  <Swiper
    {...props}
    effect="slide"
    showArrows={true}
    showIndicators={true}
    autoPlay={true}
    delay={8000}
    pauseOnHover={true}
    className="py-12"
  />
);

// Product Swiper - للمنتجات
export const ProductSwiper: React.FC<SwiperProps> = (props) => (
  <Swiper
    {...props}
    effect="slide"
    showArrows={true}
    showIndicators={true}
    autoPlay={false}
    className="h-64 md:h-80"
  />
);

// News Swiper - للأخبار
export const NewsSwiper: React.FC<SwiperProps> = (props) => (
  <Swiper
    {...props}
    effect="slide"
    showArrows={true}
    showIndicators={false}
    autoPlay={true}
    delay={6000}
    className="h-48 md:h-56"
  />
);

// Vertical Swiper - للسوايبر العمودي
export const VerticalSwiper: React.FC<SwiperProps> = (props) => (
  <Swiper
    {...props}
    direction="vertical"
    effect="slide"
    showArrows={true}
    showIndicators={true}
    autoPlay={true}
    className="h-96"
  />
);

// Cube Swiper - للسوايبر المكعبي
export const CubeSwiper: React.FC<SwiperProps> = (props) => (
  <Swiper
    {...props}
    effect="cube"
    showArrows={true}
    showIndicators={true}
    autoPlay={false}
    className="h-80 perspective-1000"
  />
);
