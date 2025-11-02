import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Posts from "@/components/Posts";
import CategoryNavbar from "@/components/CategoryNavbar";


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

