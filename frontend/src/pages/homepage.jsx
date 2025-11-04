import React from "react";
import Navbar from "@/components/Common/Navbar";
import HeroSection from "@/components/Features/HeroSection";
import Posts from "@/components/Features/ProductCard";
import CategoryNavbar from "@/components/Common/CategoryNavbar";


export default function Homepage() {
  return (
    <div className="min-h-screen w-full bg-gray-100 text-gray-900">
      <Navbar />
      <CategoryNavbar />
      <HeroSection /> 
      <Posts />
    </div>
  );
}

