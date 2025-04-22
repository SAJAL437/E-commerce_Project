"use client";

import { useEffect, useState, useCallback } from "react";
import { filters, singleFilter } from "./FilterData";
import FilterListIcon from "@mui/icons-material/FilterList";
import ProductCard from "./ProductCard";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import {
  Radio,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Backdrop,
  CircularProgress,
  Pagination,
  Button,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProducts } from "../../../ReduxState/Product/Action";

// Native debounce function
function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const sortOptions = [
  { name: "Price: Low to High", value: "price_low", current: false },
  { name: "Price: High to Low", value: "price_high", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const param = useParams();
  const dispatch = useDispatch();
  const { customersProduct } = useSelector((store) => store);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);

  const searchParams = new URLSearchParams(decodeURIComponent(location.search));
  const colorValue = searchParams.get("color");
  const sizeValue = searchParams.get("size");
  const price = searchParams.get("price");
  const sortValue = searchParams.get("sort");
  const pageNumber = parseInt(searchParams.get("pageNumber")) || 1;
  const discount = searchParams.get("discount");
  const stock = searchParams.get("stock");

  // Fetch products based on filters
  useEffect(() => {
    const [minPrice, maxPrice] =
      price === null ? [0, 0] : price.split("-").map(Number);
    const data = {
      category: param.lavelThree,
      colors: colorValue ? colorValue.split(",") : [],
      sizes: sizeValue ? sizeValue.split(",") : [],
      minPrice: minPrice || 0,
      maxPrice: maxPrice || 10000,
      minDiscount: discount || 0,
      sort: sortValue || "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 10,
      stock: stock,
    };
    dispatch(findProducts(data));
  }, [
    param.lavelThree,
    colorValue,
    sizeValue,
    price,
    discount,
    sortValue,
    pageNumber,
    stock,
    dispatch,
  ]);

  // Update loader state
  useEffect(() => {
    setIsLoaderOpen(customersProduct.loading);
  }, [customersProduct.loading]);

  // Debounced navigation for filter changes
  const debouncedNavigate = useCallback(
    debounce((query) => {
      navigate(`?${query}`);
    }, 300),
    [navigate]
  );

  // Handle pagination
  const handlePaginationChange = (event, value) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("pageNumber", value);
    navigate(`?${searchParams.toString()}`);
  };

  // Handle multi-select filter (checkboxes)
  const handleFilter = (value, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    let filterValue = searchParams.getAll(sectionId);

    if (filterValue.length > 0 && filterValue[0].split(",").includes(value)) {
      filterValue = filterValue[0].split(",").filter((item) => item !== value);
      if (filterValue.length === 0) {
        searchParams.delete(sectionId);
      }
    } else {
      filterValue.push(value);
    }

    if (filterValue.length > 0) {
      searchParams.set(sectionId, filterValue.join(","));
    }

    debouncedNavigate(searchParams.toString());
  };

  // Handle single-select filter (radio buttons)
  const handleRadioFilterChange = (e, sectionId) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(sectionId, e.target.value);
    debouncedNavigate(searchParams.toString());
  };

  // Handle sort change
  const handleSortChange = (sortValue) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("sort", sortValue);
    navigate(`?${searchParams.toString()}`);
  };

  // Clear all filters
  const handleClearFilters = () => {
    navigate(location.pathname);
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex size-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-closed:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex size-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="size-6" />
                </button>
              </div>

              {/* Mobile Filters */}
              <form className="mt-4 border-t border-gray-200">
                <div className="px-4 py-2">
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClearFilters}
                    fullWidth
                  >
                    Clear Filters
                  </Button>
                </div>
                {filters.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4 px-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex gap-3">
                            <div className="flex h-5 shrink-0 items-center">
                              <div className="group grid size-4 grid-cols-1">
                                <input
                                  onChange={() => handleFilter(option.value, section.id)}
                                  checked={searchParams
                                    .get(section.id)
                                    ?.split(",")
                                    .includes(option.value)}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="checkbox"
                                  className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                />
                                <svg
                                  fill="none"
                                  viewBox="0 0 14 14"
                                  className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                                >
                                  <path
                                    d="M3 8L6 11L11 3.5"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="opacity-0 group-has-checked:opacity-100"
                                  />
                                </svg>
                              </div>
                            </div>
                            <label
                              htmlFor={`filter-${section.id}-${optionIdx}`}
                              className="text-sm text-gray-600"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}

                {singleFilter.map((section) => (
                  <Disclosure
                    key={section.id}
                    as="div"
                    className="border-b border-gray-200 py-6"
                  >
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">
                          {section.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="size-5 group-data-open:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="size-5 group-not-data-open:hidden"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <FormControl>
                        <FormLabel id={`radio-group-${section.id}`}>
                          {section.name}
                        </FormLabel>
                        <RadioGroup
                          aria-labelledby={`radio-group-${section.id}`}
                          value={searchParams.get(section.id) || section.options[0]?.value}
                          name={`radio-buttons-${section.id}`}
                          onChange={(e) => handleRadioFilterChange(e, section.id)}
                        >
                          {section.options.map((option, optionIdx) => (
                            <FormControlLabel
                              key={optionIdx}
                              value={option.value}
                              control={
                                <Radio
                                  className="form-radio w-5 h-5 border-gray-300 rounded-full text-indigo-600 focus:ring-indigo-600 focus:ring-offset-2"
                                  disabled={option.disabled}
                                />
                              }
                              label={option.label}
                            />
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pt-20 pb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 size-5 shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white ring-1 shadow-2xl ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.name}>
                        <button
                          onClick={() => handleSortChange(option.value)}
                          className={classNames(
                            sortValue === option.value
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block w-full text-left px-4 py-2 text-sm data-focus:bg-gray-100"
                          )}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:mlconomia-7"
                aria-label="View grid"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="size-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                aria-label="Open filters"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="size-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
              {/* Filters */}
              <div>
                <div className="flex items-center justify-between py-8">
                  <h1 className="text-lg opacity-50 font-bold">Filters</h1>
                  <FilterListIcon />
                </div>

                <form className="hidden lg:block">
                  <div className="py-2">
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleClearFilters}
                      fullWidth
                    >
                      Clear Filters
                    </Button>
                  </div>
                  {filters.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <span className="font-medium text-gray-900">
                            {section.name}
                          </span>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <div className="space-y-4">
                          {section.options.map((option, optionIdx) => (
                            <div key={option.value} className="flex gap-3">
                              <div className="flex h-5 shrink-0 items-center">
                                <div className="group grid size-4 grid-cols-1">
                                  <input
                                    onChange={() => handleFilter(option.value, section.id)}
                                    checked={searchParams
                                      .get(section.id)
                                      ?.split(",")
                                      .includes(option.value)}
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    type="checkbox"
                                    className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                  />
                                  <svg
                                    fill="none"
                                    viewBox="0 0 14 14"
                                    className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white"
                                  >
                                    <path
                                      d="M3 8L6 11L11 3.5"
                                      strokeWidth={2}
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="opacity-0 group-has-checked:opacity-100"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}
                        </div>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}

                  {singleFilter.map((section) => (
                    <Disclosure
                      key={section.id}
                      as="div"
                      className="border-b border-gray-200 py-6"
                    >
                      <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                          <FormLabel
                            sx={{ color: "black" }}
                            className="text-gray-900"
                            id={`radio-group-${section.id}`}
                          >
                            {section.name}
                          </FormLabel>
                          <span className="ml-6 flex items-center">
                            <PlusIcon
                              aria-hidden="true"
                              className="size-5 group-data-open:hidden"
                            />
                            <MinusIcon
                              aria-hidden="true"
                              className="size-5 group-not-data-open:hidden"
                            />
                          </span>
                        </DisclosureButton>
                      </h3>
                      <DisclosurePanel className="pt-6">
                        <FormControl>
                          <RadioGroup
                            aria-labelledby={`radio-group-${section.id}`}
                            value={searchParams.get(section.id) || section.options[0]?.value}
                            name={`radio-buttons-${section.id}`}
                            onChange={(e) => handleRadioFilterChange(e, section.id)}
                          >
                            {section.options.map((option, optionIdx) => (
                              <FormControlLabel
                                key={optionIdx}
                                value={option.value}
                                control={<Radio />}
                                label={option.label}
                              />
                            ))}
                          </RadioGroup>
                        </FormControl>
                      </DisclosurePanel>
                    </Disclosure>
                  ))}
                </form>
              </div>

              {/* Product grid */}
              <div className="lg:col-span-4 w-full">
                {customersProduct.error ? (
                  <div className="text-red-500 text-center">Error loading products</div>
                ) : customersProduct.products?.content?.length > 0 ? (
                  <div className="flex flex-wrap justify-center bg-white border border-gray-100 py-5 rounded-md shadow-xl">
                    {customersProduct.products.content.map((item, index) => (
                      <ProductCard product={item} key={item.id || index} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center">No products found</div>
                )}
              </div>
            </div>
          </section>

          {/* Pagination */}
          {customersProduct.products?.totalPages > 1 && (
            <section className="w-full px-[3.6rem]">
              <div className="mx-auto w-fit px-4 py-5 flex justify-center shadow-lg rounded-3xl">
                <Pagination
                  count={customersProduct.products.totalPages}
                  color="primary"
                  onChange={handlePaginationChange}
                  page={pageNumber}
                />
              </div>
            </section>
          )}
        </main>

        {/* Loader */}
        <section>
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoaderOpen}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </section>
      </div>
    </div>
  );
}