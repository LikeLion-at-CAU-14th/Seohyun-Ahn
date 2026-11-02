"use client";

import Link from "next/link";
import { useState } from "react";
import { restaurants } from "@/data/restaurants";

export default function RestaurantsPage() {
  const [selectedCategory, setSelectedCategory] = useState("전체");

  // 맛집 데이터에서 카테고리 목록 만들기
  const categories = [
    "전체",
    ...new Set(restaurants.map((restaurant) => restaurant.category)),
  ];

  // 선택한 카테고리에 맞는 맛집만 필터링
  const filteredRestaurants =
    selectedCategory === "전체"
      ? restaurants
      : restaurants.filter(
          (restaurant) => restaurant.category === selectedCategory
        );

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">맛집 목록</h1>

      {/* 카테고리 필터 버튼 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full px-4 py-2 font-semibold transition ${
              selectedCategory === category
                ? "bg-orange-500 text-white"
                : "bg-white text-gray-600 hover:bg-orange-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 필터링된 맛집 목록 */}
      <ul className="grid grid-cols-2 gap-4">
        {filteredRestaurants.map((restaurant) => (
          <li key={restaurant.id}>
            <Link
              href={`/restaurants/${restaurant.id}`}
              className="flex flex-col gap-2 rounded-2xl bg-white p-6 shadow-sm hover:shadow-md"
            >
              <span className="text-4xl">{restaurant.emoji}</span>
              <span className="text-lg font-bold">{restaurant.name}</span>
              <span className="text-sm text-gray-500">
                {restaurant.category} · {restaurant.menu}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {filteredRestaurants.length === 0 && (
        <p className="text-center text-gray-500">
          해당 카테고리에 맛집이 없어요.
        </p>
      )}
    </div>
  );
}
