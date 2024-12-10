import NewArrival from '../Components/NewArrival';
import HeroSlider from "../Components/HeroSlider";
import TopBrandProducts from '../Components/TopBrandProducts';
import ReadyForOrder from '../Components/ReadyForOrder';
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import FeaturedProducts from '../Components/FeaturedProducts';
import OurFeatures from '../Components/OurFeatures';
import Brands from '../Components/Brands';

export const userId = 135;


export default async function Home() {

  const productRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/products/${userId}`,{
    cache : "no-store"
  });
  const products = await productRes.json();


  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get-sliders/$${userId}`,{
    cache : "no-store"
  });
  const slider = await res.json();

  const bannerRes = await fetch(`${process.env.NEXT_PUBLIC_API}/get-banners/${userId}`,{
    cache : "no-store"
  })
  const banner = await bannerRes.json();

  const bestSellersRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/best-sellers/${userId}`,{
    cache : "no-store"
  });
  const bestSellers = await bestSellersRes.json();


  const bestDealsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/best-deals/${userId}`,{
    cache : "no-store"
  });
  const bestDeals = await bestDealsRes.json();


  const newArrivalsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/new-arrivals/${userId}`,{
    cache : "no-store"
  });
  const newArrivals = await newArrivalsRes.json();


  const brandsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/brands/${userId}`,{
    cache : "no-cache"
  });
  const brands = await brandsRes.json();




  return (
    <>
      <HeroSlider slider={slider} banner={banner}/>
      <OurFeatures />
      <FeaturedCategories />
      <ReadyForOrder products={products}/>
      <FeaturedProducts bestSellers={bestSellers} bestDeals={bestDeals}/>
      <BannerSection banner={banner}/>
      <NewArrival newArrivals={newArrivals} banner={banner}/>
      <TopBrandProducts products={products} brands={brands.data}/>
      <Brands/>      
    </>
  );
}

