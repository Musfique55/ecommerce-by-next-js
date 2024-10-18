"use client";
import React, { useEffect, useState } from "react";
import products from "/products.json";
import Image from "next/image";
import ReactStars from "react-rating-stars-component";
import useStore from "@/app/CustomHooks/useStore";
import { MdOutlineChevronRight,MdOutlineChevronLeft } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa6";
const Page = ({ params }) => {
  const title = params.slug.split("%20").join(" ");
  const [imageIndex, setImageIndex] = useState(0);
  const [scroll,setScroll] = useState(0);
  const product = products.find((item) => item.title === title);
  const [images,setImages] = useState(product?.image ||[]);
  const { handleCart,handleWishlist } = useStore();
  const [quantity,setQuantity] = useState(1);
  const handleNext = () => {
    if(product?.image.length - 1 > imageIndex){
        setImageIndex(imageIndex + 1);
    }else{
        setImageIndex(0);
    }
  }
  const handlePrev = () => {
    if( imageIndex > 0){
        setImageIndex(imageIndex - 1);
    }else {
        setImageIndex(product?.image.length - 1);
    }
  }

  useEffect(() => {
    const handleScroll = () => {
        setScroll(window.scrollY);
    }
    window.addEventListener('scroll',handleScroll);
    return () => window.removeEventListener('scroll',handleScroll)  
   },[scroll])


   const handleMobileSlider = (idx) => {
      
      const updatedImages = [...images.slice(idx), ...images.slice(0, idx)];
      setImages(updatedImages);
      setImageIndex(0);
    }

   
  
  return (
    <div className="bg-white p-4 sm:p-6 lg:p-8 mx-auto text-black max-w-7xl overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Image Section */}
        <div className="flex flex-col-reverse relative flex-1 items-center md:flex-row">
          {/* Right Arrow */}
          <div className="text-white hidden md:block absolute text-4xl transform bg-[#4eb0be] -translate-y-1/2 md:right-4  cursor-pointer z-50 ">
            <MdOutlineChevronRight onClick={handleNext} className="text-3xl sm:text-4xl cursor-pointer z-50"/>
          </div>

          <div className="mt-4 flex  gap-2 md:flex-col">
            {/* Thumbnail Images */}
            {images.length > 0 &&
              images?.map((image, idx) => {
                return (
                  <Image
                    key={idx}
                    onClick={() => handleMobileSlider(idx)}
                    src={image}
                    alt="product-details"
                    height={80}
                    width={80}
                    className="rounded cursor-pointer hover:opacity-75 transition-opacity"
                    style={{
                        userSelect: 'none',       // Disable text/image selection
                        WebkitUserDrag: 'none'    // Disable drag on images
                      }}
                  />
                );
              })
            }
          </div>

          {/* Main Product Image */}
          <Image
            src={images[imageIndex]}
            alt="product-details"
            height={280}
            width={280}
            className="rounded mx-auto transition ease-linear duration-1000"
            style={{
                userSelect: 'none',       
                pointerEvents: 'none',    
                WebkitUserDrag: 'none'    
              }}
          />

          {/* Left Arrow */}
          <div className="text-white hidden md:block absolute text-4xl bg-[#4eb0be] transform -translate-y-1/2 left-16 md:left-14 lg:left-[8rem] cursor-pointer z-50">
            <MdOutlineChevronLeft onClick={handlePrev} className="text-3xl sm:text-4xl cursor-pointer z-50"/>
          </div>
        </div>

        {/* Details Section */}
        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-bold" style={{
                        userSelect: 'none',       // Disable text/image selection
                        WebkitUserDrag: 'none'    // Disable drag on images
                      }}>{product?.title}</h1>

            <div className="gap-3 flex items-center">
              <ReactStars
                count={5}
                edit={false}
                size={20}
                value={product?.ratings || 0}
                isHalf={true}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#1A1A7E"
              />
              <p className="ml-2 mt-1 block text-gray-600">
                ({product.ratings})
              </p>
            </div>
          </div>

          <div className="flex justify-between">
            <p className="text-black">Price {product?.price} $</p>
            <p className="text-[#1A1A7E]">In Stock {product?.stocks}</p>
          </div>

          {/* quantity field */}
          <div className="flex items-center gap-5">
            <div className="flex items-center border border-gray-300 rounded w-fit">
            <input
              type="number"
              value={quantity}
              min={quantity}
              max={2}
              className="w-12 h-10 text-center border-none focus:outline-none no-arrows"
            />
            <div className="flex flex-col justify-between ">
              <button onClick={() => quantity < 2 ?  setQuantity(quantity + 1) : alert('maximum 2 items can be added')} className="px-2 border-b border-l border-gray-300">▲</button>
              <button onClick={() => quantity > 0  ?  setQuantity(quantity - 1) : null} className="px-2 border-l border-gray-300">▼</button>
            </div>
          </div>
          {/* wishlist */}
          <FaRegHeart onClick={() => handleWishlist(product)} className="text-2xl cursor-pointer"/>
          </div>


          {/* Action Buttons */}
          <div className="mt-6">
            <button className="w-full bg-red-600 text-white rounded px-4 py-2">
              Buy it now
            </button>
            <button
              onClick={() => handleCart(product,quantity)}
              className="w-full bg-gray-800 text-white rounded px-4 py-2 mt-2"
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
      <h3 className="text-[#4eb0be] text-lg text-center mt-36 mb-10">
        Specification
      </h3>

      <div className="border p-10 ">
        <h2 className="text-[#4D5959] text-5xl mb-5">{product.title}</h2>
        <h5 className="mb-5">Technical Details</h5>
        <table className="table-auto w-full text-left">
          <tbody>
            <tr className="border">
              <td className="py-2 font-bold text-gray-700 pl-5">PRODUCT NAME</td>
              <td className="py-2 text-gray-600 border pl-5">{product.title}</td>
            </tr>
            <tr className="border">
              <td className="py-2 font-bold text-gray-700 pl-5">DISPLAY</td>
              <td className="py-2 text-gray-600 whitespace-pre-line border pl-5">
                <li>
                27-inch (diagonal) 5K Retina Display,
                </li>       
                <li>600 nits brightness,{"\n"}</li>
                <li>5120 x 2880 at 218 pixels per inch,{"\n"}</li>
                <li>True Tone technology,{"\n"}</li>
                <li>Wide color (P3),{"\n"}</li>
                <li>Configurable with Nano-texture glass,{"\n"}</li>
                <li>Support for 1 billion colors</li>
              </td>
            </tr>
            <tr className="border">
              <td className="py-2 font-bold text-gray-700 pl-5">CAMERA</td>
              <td className="py-2 text-gray-600 whitespace-pre-line border pl-5">
                <li>122° Field of view,{"\n"}</li>
                <li>12MP Ultra Wide camera,{"\n"}</li>
                <li>Center Stage,{"\n"}</li>
                <li>ƒ/2.4 aperture</li>
              </td>
            </tr>
            <tr className="border">
              <td className="py-2 font-bold text-gray-700 pl-5">AUDIO</td>
              <td className="py-2 text-gray-600 whitespace-pre-line border pl-5">
                <li>Wide stereo sound,{"\n"}</li>
                <li>Force-canceling speakers,{"\n"}</li>
                <li>Studio-quality three-mic array with high signal-to-noise ratio,{"\n"}</li>
                <li>Directional beamforming,{"\n"}</li>
                <li>Support for "Hey Siri"</li>
              </td>
            </tr>
            <tr className="border">
              <td className="py-2 font-bold text-gray-700 pl-5">SIZE</td>
              <td className="py-2 text-gray-600 whitespace-pre-line border pl-5">
                <li>Height (with stand): 18.8 inches (47.8 cm),{"\n"}</li>
                <li>Width: 25.6 inches (65.0 cm),{"\n"}</li>
                <li>Depth (with stand): 6.6 inches (16.8 cm),{"\n"}</li>
                <li>Weight: 14.3 pounds (6.5 kg)</li>
              </td>
            </tr>
            <tr className="border">
              <td className="py-2 font-bold text-gray-700 pl-5">CONNECTIONS</td>
              <td className="py-2 text-gray-600 whitespace-pre-line border pl-5">
                <li>One upstream Thunderbolt 3 (USB-C) port,{"\n"}</li>
                <li>Three downstream USB-C (USB 3.1 Gen 1) ports</li>
              </td>
            </tr>
            <tr className="border">
              <td className="py-2 font-bold text-gray-700 pl-5">WARRANTY</td>
              <td className="py-2 text-gray-600 border pl-5">
                1 Year Apple International Warranty
              </td>
            </tr>
          </tbody>
        </table>

        {/* extra descriptions */}
        <div className="mt-20">
        <h3 className="text-xl font-bold mb-2">
          Immerse Yourself in Stunning Clarity: Apple Studio Display 27-Inch 5K
          Retina Display
        </h3>
        <p className="text-gray-600 mb-4">
          Experience an unparalleled visual treat through the 27-inch 5K Retina
          display at the Apple Studio Display. Hosting a resolution of 5120 x
          2880 pixels at 218 pixels per inch, this display brings razor-sharp
          text, lifelike images, and vibrant colors to life, whether you're
          editing videos, working on graphic design, or simply enjoying
          content.
        </p>

        <h3 className="text-xl font-bold mb-2">
          Brilliant Visuals and True-to-Life Colors: Discover the Power of 600
          nits Brightness
        </h3>
        <p className="text-gray-600 mb-4">
          Ensuring vivid visuals in bright lighting conditions, the display's
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
          Compatibility and System Requirements: Your Devices' Perfect Companion
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
          Package Contents: What's Included in the Box of Apple Studio Display
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
      </div>  
      

      {/* bottom cart */}

      <div className={`${scroll > 700 ? "fixed left-0 bottom-0" : 'ease-out hidden fade'} transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full  bg-white text-black flex justify-between items-center py-4 px-6 border-t`}>
      {/* Product Information */}
      <div className="text-lg font-light">
        <span className="font-medium">
          {product.title}
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
            <button onClick={() => quantity < 2 ?  setQuantity(quantity + 1) : alert('maximum 2 items can be added')} className="px-2 border-b border-l border-gray-300">▲</button>
            <button onClick={() => quantity > 0  ?  setQuantity(quantity - 1) : null} className="px-2 border-l border-gray-300">▼</button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button onClick={() => handleCart(product,quantity)} className="bg-[#bc9975] hover:bg-[#b48f6a] text-white font-semibold py-2 px-6 rounded transition duration-300">
          ADD TO CART
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
