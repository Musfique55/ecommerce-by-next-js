"use client";
import {  useState } from 'react';
import {SLIDES_DATA} from '../../constants';
import BestDeals from '../Components/BestDeals';
import HeroSlider from "../Components/HeroSlider";
import TrendingProducts from '../Components/TrendingProducts';
import products from "/products.json";
import RecommendedProducts from '../Components/RecommendedProducts';
import TrendingWeekProducts from '../Components/TrendingWeekProducts';
import FourthSectionBanner from '../Components/FourthSectionBanner';
import Collection from '../Components/Collection';
import FeaturedProducts from '../Components/FeaturedProducts';

export default function Home() {
  const categories = [...new Set(products.map((product) => product.category))];
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const filteredProducts = products.filter(
    (product) => product.category === currentCategory
  );
  
  return (
    <>
      <HeroSlider slides={SLIDES_DATA}/>
      <Collection products={products}/>
      <FeaturedProducts />
      <FourthSectionBanner />
      <TrendingProducts products={products} categories={categories} filteredProducts={filteredProducts} setCurrentCategory={setCurrentCategory} currentCategory={currentCategory}/>
      <BestDeals products={products}/>
      <TrendingWeekProducts products={products} filteredProducts={filteredProducts}/>
      <RecommendedProducts categories={categories} products={products}  filteredProducts={filteredProducts}/>
      
    </>
  );
}
