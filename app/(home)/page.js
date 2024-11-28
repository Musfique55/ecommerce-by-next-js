
import NewArrival from '../Components/NewArrival';
import HeroSlider from "../Components/HeroSlider";
import TopBrandProducts from '../Components/TopBrandProducts';
import ReadyForOrder from '../Components/ReadyForOrder';
import BannerSection from '../Components/BannerSection';
import FeaturedCategories from '../Components/FeaturedCategories';
import FeaturedProducts from '../Components/FeaturedProducts';
import OurFeatures from '../Components/OurFeatures';
import Brands from '../Components/Brands';



export default async function Home() {

  const productRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/products/3`,{
    next : {revalidate : 60}
  });
  const products = await productRes.json();


  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/get-sliders/3`,{
    next : {revalidate : 60}
  });
  const slider = await res.json();

  const bannerRes = await fetch(`${process.env.NEXT_PUBLIC_API}/get-banners/3`,{
    next : {revalidate : 60}
  })
  const banner = await bannerRes.json();

  const bestSellersRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/best-sellers/38`,{
    next : {revalidate : 60}
  });
  const bestSellers = await bestSellersRes.json();


  const bestDealsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/best-deals/38`,{
    next : {revalidate : 60}
  });
  const bestDeals = await bestDealsRes.json();


  const newArrivalsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/new-arrivals/38`,{
    next : {revalidate : 60}
  });
  const newArrivals = await newArrivalsRes.json();


  const brandsRes = await fetch(`${process.env.NEXT_PUBLIC_API}/public/brands/38`,{
    next : {revalidate : 60}
  });
  const brands = await brandsRes.json();




  return (
    <>

      <HeroSlider slider={slider} banner={banner}/>
      <OurFeatures />
      <FeaturedCategories products={products}/>
      <ReadyForOrder products={products}/>
      <FeaturedProducts bestSellers={bestSellers} bestDeals={bestDeals}/>
      <BannerSection />
      <NewArrival newArrivals={newArrivals}/>
      <TopBrandProducts products={products} brands={brands.data}/>
      <Brands/>      
    </>
  );
}

