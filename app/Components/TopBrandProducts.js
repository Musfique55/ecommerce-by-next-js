"use client";

import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import Image from "next/image";
import "@smastrom/react-rating/style.css";
import Heading from "../CustomHooks/heading";
import useStore from "../CustomHooks/useStore";
import Link from "next/link";
import axios from "axios";

const TopBrandProducts = ({ brands }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const { handleCart } = useStore();
  const [pdcByBrands, setPdcByBrands] = useState([]);
  const [loading, setLoading] = useState(false);

  const getProductsByBrands = async (brandId) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${process.env.NEXT_APP_API}/public/brandwise-products/${brandId === -1 ? '' : brandId}`
      );
      const data = res.data;
      setPdcByBrands(data.data || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      setPdcByBrands([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const brandId = tabIndex === 0 ? -1 : brands[tabIndex - 1]?.id;
    getProductsByBrands(brandId);
  }, [tabIndex, brands]);

  return (
    <div className="mt-12">
      <Heading title={"Top Brand Products"} />

      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)} className="mt-5">
        <TabList className="flex flex-wrap justify-center gap-5 mb-5 md:flex-wrap lg:flex-nowrap">
          <Tab
            className={`text-sm cursor-pointer outline-none ${
              tabIndex === 0
                ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                : "text-black"
            }`}
          >
            All
          </Tab>
          {brands?.slice(0, 6).map((brand, index) => (
            <Tab
              key={brand.id}
              className={`text-sm cursor-pointer outline-none ${
                tabIndex === index + 1
                  ? "font-semibold border-b-2 text-[#1A1A7E] border-[#1A1A7E]"
                  : "text-black"
              }`}
            >
              {brand?.name}
            </Tab>
          ))}
        </TabList>

        {[null, ...brands?.slice(0, 6)].map((_, index) => (
          <TabPanel key={index}>
            {loading ? (
              <p className="text-center">Loading...</p>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {pdcByBrands?.length > 0 ? (
                  pdcByBrands.map((product) => (
                    <Link
                      key={product.id}
                      href={`products/${product.id}`}
                      className="max-w-sm bg-white text-center border-gray-200 flex flex-col justify-between p-4 border rounded-lg"
                    >
                      {product.image_path ? (
                        <Image
                          src={product?.image_path}
                          height={256}
                          width={256}
                          alt={product.name}
                          quality={75}
                        />
                      ) : (
                        "No Image"
                      )}
                      <h3 className="text-sm font-medium mb-2 text-black">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-800 font-bold mb-4">
                        {product.retails_price} ৳
                      </p>
                      <div className="flex gap-2 items-center">
                        <button className="border-[#1A1A7E] border text-xs text-[#1A1A7E] w-full px-[2px] py-1 rounded-md font-semibold transition-colors">
                          Buy Now
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            handleCart(product, 1);
                          }}
                          className="bg-[#1A1A7E] border border-transparent text-xs text-white w-full px-[2px] py-1 rounded-md font-semibold transition-colors"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </Link>
                  ))
                ) : (
                  <p className="text-black col-span-full text-center">No products found for this brand.</p>
                )}
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default TopBrandProducts;


