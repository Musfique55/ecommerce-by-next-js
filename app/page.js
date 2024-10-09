import {SLIDES_DATA} from '../constants';
import HeroSlider from "./Components/HeroSlider";
import TrendingProducts from './Components/TrendingProducts';
export default function Home() {
  
  return (
    <div>
      <HeroSlider slides={SLIDES_DATA}/>
      <TrendingProducts />
    </div>
  );
}
