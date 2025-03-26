"use client";

import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";
import { Button, Box, Stack, LinearProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { Radio, RadioGroup } from "@headlessui/react";
import ProductReviewCard from "./ProductReviewCard";

import { mens_kurta } from "../../../Data/mens/men_kurta";
import HomeSectionCard from "../HomeSectrionCard/HomeSectionCard";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../ReduxState/Product/Action";
import { addItemToCart } from "../../../ReduxState/Cart/Action";

const product = {
  name: "Basic Tee 6-Pack",
  price: "$192",
  href: "#",
  breadcrumbs: [
    { id: 1, name: "Men", href: "#" },
    { id: 2, name: "Clothing", href: "#" },
  ],
  images: [
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-secondary-product-shot.jpg",
      alt: "Two each of gray, white, and black shirts laying flat.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg",
      alt: "Model wearing plain black basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg",
      alt: "Model wearing plain gray basic tee.",
    },
    {
      src: "https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-02-featured-product-shot.jpg",
      alt: "Model wearing plain white basic tee.",
    },
  ],
  colors: [
    { name: "White", class: "bg-white", selectedClass: "ring-gray-400" },
    { name: "Gray", class: "bg-gray-200", selectedClass: "ring-gray-400" },
    { name: "Black", class: "bg-gray-900", selectedClass: "ring-gray-900" },
  ],
  sizes: [
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    "Hand cut and sewn locally",
    "Dyed with our proprietary colors",
    "Pre-washed & pre-shrunk",
    "Ultra-soft 100% cotton",
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
};
// const reviews = { href: "#", average: 4, totalCount: 117 };

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState("");
  const [activeImage, setActiveImage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const param = useParams();
  const { productId } = useParams();
  const jwt = localStorage.getItem("jwt");
  const { customersProduct } = useSelector((store) => store);

  const handleSubmit = () => {
    const data = { productId, size: selectedSize.name };
    dispatch(addItemToCart({ data, jwt }));
    navigate("/cart");
  };
  const handleSetActiveImage = (image) => {
    setActiveImage(image);
  };

  useEffect(() => {
    const data = { productId: Number(productId), jwt };
    dispatch(findProductsById(data));
    console.log("productDetails: ", data);
  }, [productId]);

  return (
    <div className="bg-white lg:px-16">
      <div className="pt-6">
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {product.breadcrumbs.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href={product.href}
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.name}
              </a>
            </li>
          </ol>
        </nav>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10">
          {/* Image gallery */}
          <div className="flex flex-col items-center">
            <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
              <img
                src={activeImage?.src || customersProduct.products?.imageUrl}
                alt={product.images[0].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="flex flex-wrap space-x-5 justify-center">
              {product.images.map((image, index) => (
                <div
                  onClick={() => handleSetActiveImage(image)}
                  key={index}
                  className="aspect-h-3 aspect-w-3 overflow-hidden
                  rounded-lg max-w-[5rem] max-h-[5rem] mt-4 "
                >
                  <img
                    alt={image.alt}
                    src={image.src}
                    className="h-full w-full object-cover object-center cursor-pointer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="mx-auto lg:col-span-1 max-w-2xl px-4 pb-16 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="lg:col-span-2 ">
              <h1 className="text-lg lg:text-xl font-semibold text-gary-900">
                {customersProduct.products?.brand}
              </h1>
              <h2 className="text-lg lg:text-lg text-gray-900 opacity-60 pt-1">
                {customersProduct.products?.title}
              </h2>
            </div>

            {/* Options */}
            <div className="mt-4 lg:row-span-3 lg:mt-0">
              <h2 className="sr-only">Product information</h2>

              <div className="flex space-x-5 items-center text-md lg:text-lg mt-4 text-gray-900">
                <p className="font-semibold">
                  ₹{customersProduct.products?.discountedPrice}
                </p>

                <p className="opacity-50 line-through">
                  ₹{customersProduct.products?.price}
                </p>
                <p className="text-green-600 font-semibold">
                  {customersProduct.products?.discountPersent}% Off
                </p>
              </div>

              {/* Reviews */}
              <div className="mt-6">
                <div className="flex items-center space-x-3">
                  <Rating
                    name="read-only"
                    value={3.5}
                    precision={0.5}
                    readOnly
                  />
                  <p className="opacity-50 text-sm">2435 Rating</p>
                  <p className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500">
                    87565 reviews
                  </p>
                </div>
              </div>

              <form className="mt-10" onSubmit={handleSubmit}>
                {/* Sizes */}
                <div className="mt-10 mb-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  </div>

                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                    >
                      {product.sizes.map((size) => (
                        <Radio
                          key={size.name}
                          value={size}
                          disabled={!size.inStock}
                          className={classNames(
                            size.inStock
                              ? "cursor-pointer bg-white text-gray-900 shadow-xs"
                              : "cursor-not-allowed bg-gray-50 text-gray-200",
                            "group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-hidden data-focus:ring-2 data-focus:ring-indigo-500 sm:flex-1 sm:py-6"
                          )}
                        >
                          <span>{size.name}</span>
                          {size.inStock ? (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-checked:border-indigo-500 group-data-focus:border"
                            />
                          ) : (
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                            >
                              <svg
                                stroke="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                className="absolute inset-0 size-full stroke-2 text-gray-200"
                              >
                                <line
                                  x1={0}
                                  x2={100}
                                  y1={100}
                                  y2={0}
                                  vectorEffect="non-scaling-stroke"
                                />
                              </svg>
                            </span>
                          )}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ px: "1rem", py: "0.5rem", bgcolor: "#9155fd" }}
                >
                  Add to Cart
                  <span className="ml-2 text-xs font-medium text-white">
                    <ShoppingCartIcon style={{ fontSize: "20px" }} />
                  </span>
                </Button>
              </form>
            </div>

            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pr-8 lg:pb-16">
              {/* Description and details */}
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-gray-900">
                    {customersProduct.products?.description}
                  </p>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10">
                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                <div className="mt-4 space-y-6">
                  <p className="text-sm text-gray-600">{product.details}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* rating and reviews */}
        <section>
          <h1 className="font-semibold text-lg pb-4">
            Recent Reviews & Ratings
          </h1>

          <div className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm">
            <Stack
              spacing={5}
              direction={{ xs: "column", md: "row" }}
              alignItems="flex-start"
            >
              {/* Review Cards Section (60%) */}
              <Box
                sx={{
                  flexBasis: { xs: "100%", md: "60%" },
                  minWidth: 0,
                }}
              >
                {[1, 1, 1].map((_, index) => (
                  <ProductReviewCard key={index} />
                ))}
              </Box>

              {/* Rating Summary Section (40%) */}
              <Box
                sx={{
                  flexBasis: { xs: "100%", md: "40%" },
                  borderRadius: "12px",
                  padding: "1.5rem",
                  minWidth: 0,
                }}
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-3">
                  Product Rating
                </h2>

                {/* Overall Rating */}
                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={2}
                  className="mb-5"
                >
                  <Rating value={3.5} precision={0.5} readOnly />
                  <p className="text-sm text-gray-500">54325 Ratings</p>
                </Stack>

                {/* Rating Breakdown (Hardcoded) */}
                <Box className="my-4 space-y-3">
                  {/* Single Progress Row */}
                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Excellent
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={73}
                      color="success"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Very Good
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={66}
                      color="success"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Good
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={47}
                      color="warning"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Average
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={30}
                      color="warning"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>

                  <Stack direction="row" spacing={2} alignItems="center">
                    <p className="w-20 text-sm font-medium text-gray-700">
                      Poor
                    </p>
                    <LinearProgress
                      variant="determinate"
                      value={10}
                      color="error"
                      sx={{
                        flexGrow: 1,
                        height: 4,
                        bgcolor: "#e5e7eb",
                        borderRadius: 4,
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
            </Stack>
          </div>
        </section>

        {/* similar products */}

        <section className="pt-10">
          <h1 className="py-5 text-xl font-bold text-gray-900">
            Similer Products
          </h1>

          <div className="flex flex-wrap space-y-5 ">
            {mens_kurta.map((item, index) => (
              <HomeSectionCard key={index} product={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
