import { useState } from "react";
import { ShoppingBag, ToyBrick, Apple, Headphones, Sparkles, Shirt, Heart } from "lucide-react";

export default function CategoryNavbar({ onCategoryChange }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) onCategoryChange(categoryId);
  };

  const categories = [
    { id: "All", name: "All", icon: ShoppingBag, showHeart: true },
    { id: "Accessories", name: "Accessories", icon: ToyBrick },
    { id: "Food", name: "Food", icon: Apple },
    { id: "Electronics", name: "Electronics", icon: Headphones },
    { id: "Beauty", name: "Beauty", icon: Sparkles },
    { id: "Fashion", name: "Fashion", icon: Shirt },
  ];

  return (
    <div className="w-full bg-white border-b border-gray-200 sticky top-[73px] z-40">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 overflow-x-auto py-3 sm:py-4 scrollbar-hide">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = activeCategory === category.id;
            
            return (
              <button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className="flex flex-col items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 transition-colors hover:opacity-80 flex-shrink-0 relative group"
              >
                <div className="relative">
                  {category.showHeart && isActive ? (
                    <div className="relative flex items-center justify-center">
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                      <Heart className="absolute w-3 h-3 sm:w-3.5 sm:h-3.5 text-blue-600 fill-blue-600 -top-0.5 -right-0.5 sm:-top-1 sm:-right-1" />
                    </div>
                  ) : (
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                  )}
                </div>
                <span className={`text-xs sm:text-sm font-medium whitespace-nowrap ${isActive ? 'text-blue-600' : 'text-gray-600'}`}>
                  {category.name}
                </span>
                {isActive && (
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full h-0.5 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
