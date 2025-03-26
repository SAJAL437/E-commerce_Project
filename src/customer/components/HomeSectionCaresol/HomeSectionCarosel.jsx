import { useState } from "react";
import AliceCarousel from "react-alice-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HomeSectionCard from "../HomeSectrionCard/HomeSectionCard";
import { mens_kurta } from "../../../Data/Mens_Kurta";

const HomeSectionCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Number of visible items based on screen size
  const visibleItemsCount = {
    0: 1,
    720: 3,
    1024: 5,
  };

  const responsive = {
    0: { items: visibleItemsCount[0] },
    720: { items: visibleItemsCount[720] },
    1024: { items: visibleItemsCount[1024] },
  };

  const totalItems = 10; // only using the first 10 items from mens_kurta
  const maxIndex = totalItems - visibleItemsCount[1024]; // On large screens, show 5 at a time, so maxIndex = 10 - 5 = 5

  const slidePrev = () => setActiveIndex((prev) => Math.max(prev - 1, 0));
  const slideNext = () =>
    setActiveIndex((prev) => Math.min(prev + 1, maxIndex));

  const syncActiveIndex = ({ item }) => setActiveIndex(item);

  const items = mens_kurta
    .slice(0, totalItems)
    .map((item) => <HomeSectionCard product={item} />);

  return (
    <div className="px-4 lg:px-8">
      <div className="relative p-5 rounded-2xl shadow-md justify-center px-5 lg:px-10">
        <AliceCarousel
          items={items}
          disableButtonsControls
          disableDotsControls
          responsive={responsive}
          activeIndex={activeIndex}
          onSlideChanged={syncActiveIndex}
        />

        {/* Previous Button (Hide if at first slide) */}
        {activeIndex > 0 && (
          <button
            onClick={slidePrev}
            className="absolute cursor-pointer top-1/2 -translate-y-1/2 -left-4 bg-gray-700 py-2 flex items-center justify-center rounded text-white shadow-md"
            aria-label="Previous"
          >
            <ArrowBackIosIcon className="mx-1 relative left-1" />
          </button>
        )}

        {/* Next Button (Hide if at last slide) */}
        {activeIndex < maxIndex && (
          <button
            onClick={slideNext}
            className="absolute cursor-pointer top-1/2 -translate-y-1/2 -right-4 bg-gray-700 py-2 flex items-center justify-center rounded text-white shadow-md"
            aria-label="Next"
          >
            <ArrowForwardIosIcon className="mx-1" />
          </button>
        )}
      </div>
    </div>
  );
};

export default HomeSectionCarousel;
