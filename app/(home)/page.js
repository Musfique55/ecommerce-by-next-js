
import {SLIDES_DATA} from '../../constants';
import NewArrival from '../Components/NewArrival';
import HeroSlider from "../Components/HeroSlider";
import TopBrandProducts from '../Components/TopBrandProducts';
import products from "/products.json";
import ReadyForOrder from '../Components/ReadyForOrder';
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import FeaturedProducts from '../Components/FeaturedProducts';
import OurFeatures from '../Components/OurFeatures';
import Brands from '../Components/Brands';

export default function Home() {
  
  return (
    <>
      <HeroSlider slides={SLIDES_DATA}/>
      <OurFeatures />
      <FeaturedCategories products={products}/>
      <ReadyForOrder products={products}/>
      <FeaturedProducts />
      <BannerSection />
      <NewArrival/>
      <TopBrandProducts products={products} />
      <Brands/>
      {/* <RecommendedProducts categories={categories} products={products}  filteredProducts={filteredProducts}/> */}
      
    </>
  );
}
