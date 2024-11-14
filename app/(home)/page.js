"use client";
import {  useState } from 'react';
import {SLIDES_DATA} from '../../constants';
import NewArrival from '../Components/NewArrival';
import HeroSlider from "../Components/HeroSlider";
import TopBrandProducts from '../Components/TopBrandProducts';
import products from "/products.json";
import RecommendedProducts from '../Components/RecommendedProducts';
import ReadyForOrder from '../Components/ReadyForOrder';
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import FeaturedProducts from '../Components/FeaturedProducts';
import OurFeatures from '../Components/OurFeatures';
import Brands from '../Components/Brands';

export default function Home() {
  const categories = [...new Set(products.map((product) => product.category))];
  const [currentCategory, setCurrentCategory] = useState(categories[0]);
  const filteredProducts = products.filter(
    (product) => product.category === currentCategory
  );
  
  return (
    <>
      <HeroSlider slides={SLIDES_DATA}/>
      <OurFeatures />
      <FeaturedCategories products={products}/>
      <ReadyForOrder products={products}/>
      <FeaturedProducts />
      <BannerSection />
      <NewArrival products={products}/>
      <TopBrandProducts products={products} />
      <Brands/>
      {/* <RecommendedProducts categories={categories} products={products}  filteredProducts={filteredProducts}/> */}
      
    </>
  );
}
