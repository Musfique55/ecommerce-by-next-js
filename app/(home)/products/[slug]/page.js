"use client";
import React, { useEffect, useState } from "react";
import products from "/products.json";
import Image from "next/image";
import relatedProducts from '/products.json'
import useStore from "@/app/CustomHooks/useStore";
import {  FaWhatsapp } from "react-icons/fa6";
import { Landmark } from "lucide-react";
import Link from "next/link";
import {Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import {Navigation } from 'swiper/modules';
import Heading from "@/app/CustomHooks/heading";
import useSWR from "swr";

const fetcher = (url) => fetch(url).then(res => res.json());



const Page = ({ params }) => {
  const {data : product,isLoading,error} = useSWR(`${process.env.NEXT_PUBLIC_API}/public/products-detail/${params.slug}`,fetcher) ;
  const [scroll,setScroll] = useState(0);
  const { handleCart,getCartItems,refetch,setRefetch,handleBuy } = useStore();
  const [recentItems,setRecentItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [quantity,setQuantity] = useState(1);
  const [activeTab,setActiveTab] = useState('Specification');
  
  useEffect(() => {
    setCartItems(getCartItems());
    if (refetch) {
      setCartItems(getCartItems());
      setRefetch(false);
    }
  }, [refetch]);

  console.log(product);
  
  // const handleRecentView = (item) => {
  //   const getItem = localStorage.getItem('recentViewItems');
  //   let items = getItem ? JSON.parse(getItem) : [];
  //   if(!items.some(existingItem => existingItem.title === item.title)){
  //     items.push(item);
  //   }
  //   if(getItem){
  //     setRecentItems(items);
  //   }
  //   localStorage.setItem('recentViewItems',JSON.stringify(items));
  // }

  // useEffect(() => {
  //   handleRecentView(product);
  // },[])

  // const matchWithCart = cartItems.filter(item => item.title === product.title);
  // console.log(matchWithCart);

  const [selectedColor, setSelectedColor] = useState('Space Black')
  const [selectedStorage, setSelectedStorage] = useState('128GB')

  const colors = ['Space Black', 'Gold', 'Pink', 'Blue', 'White']
  const storages = ['128GB', '256GB', '512GB']

  const isCartItem  = cartItems.find(item => item?.id === product?.data?.id || undefined); 


  useEffect(() => {
    const handleScroll = () => {
        setScroll(window.scrollY);
    }
    window.addEventListener('scroll',handleScroll);
    return () => window.removeEventListener('scroll',handleScroll)  
   },[])



  //  const handleMobileSlider = (idx) => {
      
  //     const updatedImages = [...images.slice(idx), ...images.slice(0, idx)];
  //     setImages(updatedImages);
  //     setImageIndex(0);
  //   }

  //  console.log(product);
  
  isLoading && <p>Loading....</p>
  
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 mx-auto text-black max-w-7xl overflow-hidden">
      
      <div className="container mx-auto px-4 py-8">
      {/* <div className="flex items-center text-sm mb-4">
        <Link href="/" className="text-orange-500 hover:underline">Home</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <Link href="/phones" className="text-orange-500 hover:underline">Phones & Tablets</Link>
        <ChevronRight className="w-4 h-4 mx-2" />
        <span className="text-gray-500">iPhone 16</span>
      </div> */}

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="mb-4 border flex justify-center rounded-2xl p-2 ">
            { 
             product?.data?.images?.length > 0 ? (
                  <img 
                      height={200} 
                      width={200} 
                      alt="product" 
                      src={product?.data.images[0]} 
                      className="border border-gray-300" 
                  />
              ) : product?.data?.image_path ? (
                  <img 
                      height={200} 
                      width={200} 
                      alt="product" 
                      src={product?.data.image_path} 
                      className="border border-gray-300" 
                  />
              ) : (
                <img
                src={'https://i.ibb.co.com/vwGWVVb/Pixel-7-Pro-Hazel-6784.jpg'}
                height="200"
                width="200"
                alt="mobile-phone"
                quality={75}
              />
              ) 
            }
          </div>
          <div className="flex space-x-2 mb-4 ">
            
                {/* {
                  images.map((image,idx) => {
                    return <div key={idx} className={`relative w-[130px] p-2 h-[130px] ${imageIndex === idx ? 'border-2 border-[#0F98BA]' : ''}   overflow-hidden `}>
                    <Image
                      onClick={() => setImageIndex(idx)}
                      src={image}
                      alt={product?.title}
                      fill
                      quality={100}
                      className=" "
                      placeholder="empty"
                    />
                  </div>
                  })
                } */}
                
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product?.data?.name}</h1>
          <div className="flex items-center mb-4">
            {/* <Badge variant="secondary" className="mr-2">New</Badge> */}
            {/* <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div> */}
          </div>
          <div className="mb-4 flex items-center ">
            <span className="text-3xl font-bold text-[#1A1A7E]">{product?.data?.retails_price} ৳</span>
            <span className="text-sm text-gray-800 ml-2 px-4 py-2 bg-gray-200 ">Status: {product?.data?.status}</span>
          </div>
          <div className="mb-4 flex items-center gap-3">
            <p className="text-gray-800 text-sm  p-2 bg-gray-200 flex items-center  gap-2"><Landmark size={16}/> EMI Available <Link href={'/plans'} className="text-blue-500 font-semibold">View Plans</Link></p>
            <p className="text-gray-800 text-sm bg-gray-200 p-2 "> Exchange <Link href={'/plans'} className="text-blue-500 font-semibold">View Plans</Link></p>
          </div>
          <Link
            href="https://wa.me/01639-147270" 
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center w-fit space-x-3 text-sm px-4 py-1 text-white font-semibold rounded-md bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 transition-colors duration-200 mb-3"
          >
            <FaWhatsapp className="text-2xl" />
            <span>Message <br /> on WhatsApp</span>
          </Link>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Color: {selectedColor}</h3>
            <div className="flex space-x-2">
              {/* {
              product?.data?.color.length > 0 &&
              product?.data?.color.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full border ${
                    selectedColor === color ? 'border-blue-500' : 'border-gray-300'
                  }`}
                  style={{ backgroundColor: color.toLowerCase().replace(' ', '') }}
                />
              ))} */}
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Storage: {selectedStorage}</h3>
            <div className="flex space-x-2">
              {storages.map((storage) => (
                <button
                  key={storage}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-4 py-2 rounded ${
                    selectedStorage === storage
                      ? 'bg-[#1A1A7E] text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {storage}
                </button>
              ))}
            </div>
          </div>
          {/* <div className="flex space-x-4 mb-4 flex-wrap justify-start">
            <div className="flex items-center border border-[#0F98BA] rounded-md overflow-hidden  ">
              <button
                onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}
                className="px-4 py-2 text-[#0F98BA] font-semibold "
              >
                -
              </button>
              <div className="px-4 py-2 border-[#0F98BA] border-x text-[#0F98BA] font-semibold">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-[#0F98BA] font-semibold "
              >
                +
              </button>
            </div>
            <div className="flex gap-4 mt-5 md:mt-5 lg:mt-0">
              <button onClick={() => handleBuy(product?.data,quantity)} className="px-4 border border-transparent py-1 bg-[#1A1A7E] text-white rounded-sm hover:bg-white hover:border-[#1A1A7E]  hover:text-[#1A1A7E]">Buy Now</button>

              <button disabled={isCartItem !== undefined} variant="outline" className={`border px-4 py-1 border-[#1A1A7E] text-[#1A1A7E] hover:bg-[#1A1A7E] hover:text-white  ${
              isCartItem !== undefined ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`} onClick={() => handleCart(product?.data,quantity)}>{isCartItem !== undefined ? 'Added' : 'Add to Cart'}</button>
            </div>
           
          </div> */}

          <div className="flex flex-wrap items-center gap-4 justify-start mb-4">
            {/* Quantity Controls */}
            <div className="flex items-center border border-[#0F98BA] rounded-md overflow-hidden">
              <button
                onClick={quantity > 1 ? () => setQuantity(quantity - 1) : null}
                className="px-4 py-2 text-[#0F98BA] font-semibold"
              >
                -
              </button>
              <div className="px-4 py-2 border-x border-[#0F98BA] text-[#0F98BA] font-semibold">
                {quantity}
              </div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-[#0F98BA] font-semibold"
              >
                +
              </button>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => handleBuy(product?.data, quantity)}
                className="px-4 py-1 bg-[#1A1A7E] text-white rounded-sm hover:bg-white hover:border-[#1A1A7E] hover:text-[#1A1A7E] border border-transparent"
              >
                Buy Now
              </button>

              <button
                disabled={isCartItem !== undefined}
                className={`border px-4 py-1 border-[#1A1A7E] text-[#1A1A7E] hover:bg-[#1A1A7E] hover:text-white rounded-sm ${
                  isCartItem !== undefined
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : ''
                }`}
                onClick={() => handleCart(product?.data, quantity)}
              >
                {isCartItem !== undefined ? 'Added' : 'Add to Cart'}
              </button>
            </div>
          </div>

          {/* <p className="text-sm text-gray-500">Apple Store 1 Year Warranty Support</p> */}
        </div>
      </div>

      {/* related products */}
      <div className="my-12">
        <Heading title={'Related Products'}/>
        {/* sliders of related products */}
        <Swiper
            slidesPerView={2}
            spaceBetween={20}
            navigation= {true}
            loop={true}
            modules={[Navigation]}
            breakpoints={{
              // Responsive breakpoints
              640: {
                slidesPerView: 2, // Show 2 slides for devices with width >= 640px
                spaceBetween: 10, // Adjust space for mobile
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 5, // Show 4 slides for devices with width >= 1024px
                spaceBetween: 20, // Default space for larger screens
              },
            }}
            className="trending-swiper"
            >
              {
                relatedProducts.length > 0 ? (
                  relatedProducts.slice(0,10).map((product, idx) => {
                    return (
                      <SwiperSlide key={idx} className="flex select-none justify-center">
                        <div className="max-w-sm bg-white text-center border-gray-200 grid grid-rows-[auto,1fr,auto] gap-4 p-4 border rounded-lg ">
                        <Link
                          href={`/products/${product.title}`}>
                            <div className="flex items-center justify-center">
                            <img
                              src={product?.image[0]}
                              height="200"
                              width="200"
                              alt="mobile-phone"
                              quality={75}
                            />
                            </div>
                            <div>
                              <h3 className="text-sm font-medium mb-2 text-black">
                                {product?.title}
                              </h3>
        
                              <p className="text-sm text-gray-800 font-bold mb-4">
                                {product?.price} ৳
                              </p>
                            </div>
                        </Link>
                        <div className='flex gap-2 flex-col md:flex-col lg:flex-row items-center'>
                          <button onClick={(e) => {e.preventDefault(),handleBuy(product,quantity)}} className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold  transition-colors">Buy Now</button>
                          <button
                              onClick={(e) => {e.preventDefault(),handleCart(product?.data,1)}}
                              className="bg-[#1A1A7E] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold  transition-colors"
                              >
                              Add to Cart
                              </button>
                        </div>
                        </div> 
                      </SwiperSlide>
                      
                    );
                  })
                ) : (
                  <p>No products found</p>
                )
              }
              
        </Swiper>
      </div>

      
   

      {/* <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Specifications</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            { label: 'Brand', value: 'Apple' },
            { label: 'Model', value: 'iPhone 16' },
            { label: 'Network', value: 'GSM / CDMA / HSPA / EVDO / LTE / 5G' },
            { label: 'Dimensions', value: '147.6 x 71.6 x 7.8 mm' },
            { label: 'Weight', value: '170 g' },
            { label: 'SIM', value: 'Nano-SIM and eSIM' },
            { label: 'Display Type', value: 'Super Retina XDR OLED, 120Hz, HDR10, Dolby Vision, 1200 nits (HBM)' },
            { label: 'Display Size', value: '6.1 inches' },
            { label: 'Resolution', value: '1170 x 2532 pixels' },
            { label: 'OS', value: 'iOS 18' },
            { label: 'Chipset', value: 'Apple A17 Bionic (3 nm)' },
            { label: 'CPU', value: 'Hexa-core' },
            { label: 'GPU', value: 'Apple GPU (5-core graphics)' },
            { label: 'Main Camera', value: '48 MP, f/1.8, 26mm (wide), 1.22µm, dual pixel PDAF, sensor-shift OIS' },
            { label: 'Selfie Camera', value: '12 MP, f/2.2, 23mm (wide), 1/3.6"' },
          ].map(({ label, value }) => (
            <div key={label} className="flex justify-between p-3 border rounded-lg">
              <span className="text-gray-600">{label}</span>
              <span className="font-medium">{value}</span>
            </div>
          ))}
        </div>
      </div> */}
    </div>
      
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="col-span-2">
        <div className="flex space-x-4 bg-gray-100 w-fit mb-5 p-2 rounded-lg">
          {['Specification', 'Description', 'Warranty'].map((tab) => (
            <Link
            key={tab}
            href={`#${tab}`} // Use lowercase IDs for section navigation
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1 text-sm font-semibold rounded-lg ${
              activeTab === tab ? 'text-black bg-white shadow' : 'text-gray-500'
            }`}
          >
            {tab}
          </Link>
          ))}
        </div>
        <div className="border p-4 rounded-lg">
        <h2 className="text-[#4D5959] text-xl mb-2 font-semibold">Specification</h2>


        <div className="w-[7.5rem] h-[2px] bg-[#1A1A7E] mt-1 mb-4"></div>
        <table id="Specification" className="table-auto w-full text-sm text-left">
         <tbody>
         {[
                    { label: "Brand", value: "Apple" },
                    { label: "Model", value: "iPhone 16" },
                    { label: "Network", value: "GSM / CDMA / HSPA / EVDO / LTE / 5G" },
                    { label: "Dimensions", value: "147.6 x 71.6 x 7.8 mm" },
                    { label: "Weight", value: "179 g" },
                    { label: "SIM", value: "Nano-SIM and eSIM - International" },
                    { label: "Display Type", value: "Super Retina XDR OLED | 120Hz | HDR10 | Dolby Vision | 2000 nits" },
                    { label: "Display Size", value: "6.1 inches" },
                    { label: "Display Resolution", value: "1179 x 2556 pixels" },
                    { label: "OS", value: "iOS 18" },
                    { label: "Chipset", value: "Apple A18 (3 nm)" },
                    { label: "CPU", value: "Hexa-core" },
                    { label: "Memory", value: "RAM: 8GB; Storage: 128GB | 256GB | 512GB" },
                    { label: "Main Camera", value: "48 MP(wide) | 12 MP (ultrawide) |Dual-LED dual-tone flash, HDR (photo/panorama) | 4K, 1080p, Dolby Vision HDR, Cinematic mode, Night mode, Macro Photography" },
                    { label: "Selfie Camera", value: "12 MP (wide) | HDR | Cinematic mode | 4K@24/25/30/60fps, 1080p@30/60/120fps" },
                    { label: "Sound", value: "Built-in stereo speaker | Spatial Audio playback | Dolby Digital | Dolby Digital Plus | Dolby Atmos" },
                    { label: "Battery Info", value: "Li-Ion 3500 mAh | Non-removable | Up to 30W Wired Charging | 25W wireless (MagSafe) | 15W wireless (Qi2) | 7.5W wireless (Qi)" },
                    { label: "Sensors", value: "Face ID, accelerometer, gyro, proximity, compass, barometer" },
          ].map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 font-semibold border pl-3 ">{item.label}</td>
              <td className="py-2 pl-3 border">{item.value}</td>
            </tr>
        ))}
          </tbody> 
        
        </table>
        </div>
        {/* extra descriptions */}
        <div  id="Description" className="mt-5 p-3 text-sm border rounded-lg">
        <h2 className="text-xl font-bold text-gray-900">Description</h2>
        <div className="w-[6.5rem] h-[2px] bg-[#1A1A7E] mt-1 mb-4"></div>
          <h3 className="text-xl font-bold mb-2">
            Immerse Yourself in Stunning Clarity: Apple Studio Display 27-Inch 5K
            Retina Display
          </h3>
          <p className="text-gray-600 mb-4">
            Experience an unparalleled visual treat through the 27-inch 5K Retina
            display at the Apple Studio Display. Hosting a resolution of 5120 x
            2880 pixels at 218 pixels per inch, this display brings razor-sharp
            text, lifelike images, and vibrant colors to life, whether you&apos;re
            editing videos, working on graphic design, or simply enjoying
            content.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Brilliant Visuals and True-to-Life Colors: Discover the Power of 600
            nits Brightness
          </h3>
          <p className="text-gray-600 mb-4">
            Ensuring vivid visuals in bright lighting conditions, the display&apos;s
            remarkable 600 nits brightness is complemented by support for one
            billion colors and the P3 color gamut. Opt for Nano-texture glass to
            eliminate glare and reflections, offering an uninterrupted, immersive
            display experience.
          </p>

          <h3 className="text-xl font-bold mb-2">
            True Tone Technology: Enhancing Your Viewing Experience
          </h3>
          <p className="text-gray-600 mb-4">
            Adapting to ambient lighting, {`Apple’s`} True Tone Technology ensures a
            natural and comfortable viewing experience. The Apple Studio Display
            adjusts the color temperature to match the environment, reducing eye
            strain and enhancing color accuracy.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Capturing Your World with Precision: High-Quality 12MP Ultra Wide
            Camera
          </h3>
          <p className="text-gray-600 mb-4">
            Participate in video calls with exceptional clarity using the built-in
            12MP Ultra Wide camera with a 122° field of view. Supporting Center
            Stage, this camera ensures you stay in the frame, even in motion, with
            a wide aperture of ƒ/2.4 for sharp and clear video calls in low-light
            conditions.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Center Stage for Unmatched Video Calls
          </h3>
          <p className="text-gray-600 mb-4">
            Automatically keeping you in the spotlight during video calls, Center
            Stage ensures you remain perfectly framed, whether on a conference
            call or catching up with loved ones.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Reference Modes for Perfectly Optimized Display
          </h3>
          <p className="text-gray-600 mb-4">
            Tailor the display to your specific use case with a range of reference
            modes, including HDTV Video, Apple Display, PAL and SECAM Video, NTSC
            Video, Digital Cinema, Photography, Internet and Web, and Design and
            Print. Achieve accurate color representation and optimal viewing
            experiences.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Immersive Audio Experience: Wide Stereo Sound and Studio-Quality
            Three-Mic Array
          </h3>
          <p className="text-gray-600 mb-4">
            Experience high-fidelity audio with wide stereo sound and
            force-cancelling woofers. The six-speaker system complements your
            visual experience, while the integrated studio-quality three-mic array
            with directional beamforming ensures crystal-clear voice capture for
            virtual meetings.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Customizable Ergonomics: Tilt- and Height-Adjustable Stand
          </h3>
          <p className="text-gray-600 mb-4">
            Achieve the perfect viewing angle and ergonomic setup with the tilt-
            and height-adjustable stand of the Apple Studio Display. Tilt the
            display from -5° to +25°, adjust its height up to 105 mm, and use it
            in landscape or portrait orientation. VESA mount compatibility adds
            versatility.
          </p>

          <h3 className="text-xl font-bold mb-2">
            High-Speed Connectivity with Thunderbolt 3 and USB-C Ports
          </h3>
          <p className="text-gray-600 mb-4">
            Seamlessly connect compatible devices with one upstream Thunderbolt 3
            port for host with 96W host charging and one additional Thunderbolt 3
            port. Three downstream USB-C ports (up to 10Gb/s) provide high-speed
            data transfer and charging capabilities.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Compatibility and System Requirements: Your Device&apos;s Perfect Companion
          </h3>
          <p className="text-gray-600 mb-4">
            Compatible with various Mac models running macOS Monterey 12.3 or
            later, including MacBook Air (2018 or later), Mac Pro (2019 or later),
            Mac mini (2018 or later), iMac Pro (2017), and select iPad models
            running iPadOS 15.4 or later.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Sleek Design and VESA Mount Capability: Apple Studio Display 27-Inch
          </h3>
          <p className="text-gray-600 mb-4">
            Add a touch of elegance to any workspace with the sleek and modern
            design of the Apple Studio Display. VESA mount compatibility offers a
            clean and space-saving wall mounting option.
          </p>

          <h3 className="text-xl font-bold mb-2">
            The Apple Studio Display: Electrical and Operating Requirements for
            Optimal Performance
          </h3>
          <p className="text-gray-600 mb-4">
            Operating at a frequency of 50Hz to 60Hz and with a line voltage range
            of 100-240V AC, the display is suitable for use in various regions.
            Tested up to an altitude of 16,400 feet (5000 meters) and functioning
            in a relative humidity range of 5% to 90% non-condensing, with a
            recommended operating temperature of 50° to 95° F (10° to 35° C).
          </p>

          <h3 className="text-xl font-bold mb-2">
            Package Contents: What&apos;s Included in the Box of Apple Studio Display
          </h3>
          <p className="text-gray-600 mb-4">
            The Apple Studio Display includes a Thunderbolt cable (1 m) for
            convenient connectivity. All necessary components are included to
            ensure a seamless setup.
          </p>

          <h3 className="text-xl font-bold mb-2">
            Unparalleled Warranty and Support: 1-Year Apple International Warranty
            of Apple Studio Display
          </h3>
          <p className="text-gray-600 mb-4">
            Rest easy with {`Apple’s`} 1-Year International Warranty, protecting your
            investment against manufacturing defects and malfunctions.
          </p>

          <h3 className="text-xl font-bold mb-2">
            The Best Deal in Bangladesh: Price and Where to Buy Apple Studio
            Display 27-Inch 5K Retina Display
          </h3>
          <p className="text-gray-600 mb-4">
            As of 8th June 2023, the base model of the Apple Studio Display starts
            at 235,000 Tk in Bangladesh. For the best price and a genuine product,
            consider purchasing from Custom Mac {`BD’s`} website or visiting their
            physical stores for a hassle-free buying experience. Elevate your
            workspace with the stunning Apple Studio Display 27-Inch 5K Retina
            Display.
          </p>
        </div>
        {/* warranty */}
        <div id="Warranty" className="bg-white text-sm border rounded-lg p-6 mt-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">Warranty</h2>
            <div className="w-24 h-[2px] bg-[#1A1A7E] mt-1 mb-4"></div>
            <p className="text-gray-700">
              Explore our{' '}
              <a href="/warranty-policy" className="text-[#1A1A7E] font-semibold hover:underline">
                Warranty Policy
              </a>{' '}
              page for detailed information about our warranty coverage.
            </p>
        </div>
      </div>

      {/* recent viewed items */}

         <div className="w-full max-w-md h-fit mb-2 mt-4 mx-auto bg-white shadow-md  rounded-lg p-4">
          <p className="text-xl text-center font-semibold border-b pb-1 mb-4">Recently Viewed</p>
          <div className="flex flex-col space-y-5">
            {recentItems.length > 0 ? (
              recentItems.slice(-20).map((product, index) => (
                <div
                  key={index}
                  className="flex px-2 py-3 items-center bg-white rounded-lg hover:shadow-md transition-shadow duration-200"
                >
                  <Link href={`/products/${product.title}`}>
                    <img
                      src={product?.image[0]}
                      alt={product?.title}
                      width={80}
                      height={80}
                      style={{objectFit : 'cover'}}
                      className="rounded-md"
                    />
                  </Link>

                  <div className="flex-1 ml-4">
                    <Link href={`/products/${product.title}`} className="font-semibold">
                      {product?.title}
                    </Link>
                    <p className="text-[#1A1A7E] font-bold">{product?.price} ৳</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button onClick={() => handleBuy(product,quantity)} className="bg-[#1A1A7E] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
                        Buy Now
                      </button>
                      <button className="border border-gray-300 text-gray-700 px-2 py-1 rounded-md text-xs font-medium hover:bg-gray-100 transition-colors duration-200">
                        Add to compare
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">No recently viewed items.</p>
            )}
          </div>
          </div>

       
      
    </div>
        
      {/* bottom cart */}
      {/* desktop */}
      <div className={`hidden md:flex  ${scroll > 700 ? "fixed left-0 bottom-0" : 'ease-out hidden fade'} transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full  bg-white text-black  justify-between items-center py-4 px-6 border-t`}>
      {/* Product Information */}
      <div className="text-lg font-light">
        <span className="font-medium">
          {product?.data?.name}
        </span>
      </div>

      {/* Quantity and Buttons */}
      <div className="  flex items-center space-x-4">
        {/* Quantity Selector */}
        <div className="flex items-center border border-gray-300 rounded">
          <input
            type="number"
            value={quantity}
            min={quantity}
            max={2}
            className="w-12 h-10 text-center border-none focus:outline-none no-arrows"
          />
          <div className="flex flex-col justify-between">
            <button onClick={() =>  setQuantity(quantity + 1)} className="px-2 border-b border-l border-gray-300">▲</button>
            <button onClick={() => quantity > 1  ?  setQuantity(quantity - 1) : null} className="px-2 border-l border-gray-300">▼</button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button disabled={isCartItem !== undefined} onClick={() => handleCart(product?.data,quantity)} className={`border px-4 py-1 border-[#1A1A7E] text-[#1A1A7E] hover:bg-[#1A1A7E] hover:text-white  ${isCartItem !== undefined ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`}>
          {isCartItem !== undefined ? 'Added' : 'ADD TO CART'}
        </button>

        {/* Buy It Now Button */}
        <button  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-300">
          BUY IT NOW
        </button>
      </div>
    </div>

    {/* mobile */}
      <div className={`${scroll > 700 ? "fixed left-0 bottom-0" : 'ease-out hidden fade'} transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full  bg-white text-black flex flex-col justify-between gap-y-5 items-center md:hidden py-4 px-6 border-t`}>
      {/* Product Information */}
      <div className="flex items-center justify-between w-full">
        <div className="text-lg font-light">
          <span className="font-medium">
            {product?.data?.name}
          </span>
        </div>

        <div className="flex items-center border border-gray-300 rounded">
            <input
              type="number"
              value={quantity}
              min={quantity}
              max={2}
              className="w-12 h-10 text-center border-none focus:outline-none no-arrows"
            />
            <div className="flex flex-col justify-between">
              <button onClick={() =>  setQuantity(quantity + 1)} className="px-2 border-b border-l border-gray-300">▲</button>
              <button onClick={() => quantity > 0  ?  setQuantity(quantity - 1) : null} className="px-2 border-l border-gray-300">▼</button>
            </div>
          </div>
      </div>

      {/* Quantity and Buttons */}
      <div className="  flex  items-center justify-between w-full">
        {/* Quantity Selector */}
       
        {/* Add to Cart Button */}
        <button disabled={isCartItem !== undefined} onClick={() => handleCart(product?.data,quantity)} className={`border px-4 py-1 border-[#1A1A7E] text-[#1A1A7E] hover:bg-[#1A1A7E] hover:text-white  ${isCartItem !== undefined ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : ''}`}>
          {isCartItem !== undefined ? 'Added' : 'ADD TO CART'}
        </button>

        {/* Buy It Now Button */}
        <button  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition duration-300">
          BUY IT NOW
        </button>
      </div>
    </div>

</div>

  );
};

export default Page;
