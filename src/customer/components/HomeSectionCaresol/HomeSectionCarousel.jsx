import { useState, useRef } from "react";
import PropTypes from "prop-types";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HomeSectionCard from "../HomeSectrionCard/HomeSectionCard";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

const HomeSectionCarousel = ({ data,section_Name }) => {
  const carouselRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsInSlide, setItemsInSlide] = useState(1); // Default to smallest screen

  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 5 },
  };

  const items = data
    .slice(0, 10)
    .map((item, index) => (
      <HomeSectionCard key={item.id || index} product={item} />
    ));

  const handleSlideChange = (e) => {
    setCurrentIndex(e.item);
    setItemsInSlide(e.itemsInSlide); // Update visible items on slide change
  };

  const slideNext = () => carouselRef.current?.slideNext();
  const slidePrev = () => carouselRef.current?.slidePrev();

  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex >= items.length - itemsInSlide;

  return (
    <div className="px-4 lg:px-8">
      <h2 className="text-xl font-semibold mb-4">{section_Name}</h2>

      <div className="relative p-5 rounded-2xl shadow-md justify-center px-5 lg:px-10">
        <AliceCarousel
          ref={carouselRef}
          mouseTracking
          items={items}
          responsive={responsive}
          controlsStrategy="alternate"
          disableButtonsControls={true}
          disableDotsControls={true}
          onSlideChanged={handleSlideChange}
        />

        {/* Custom Previous Button (Hide on first slide) */}
        {!isFirstSlide && (
          <button
            onClick={slidePrev}
            className="absolute cursor-pointer top-1/2 -translate-y-1/2 -left-4 bg-gray-700 py-2 px-2 flex items-center justify-center rounded text-white shadow-md z-10"
            aria-label="Previous"
          >
            <ArrowBackIosIcon className="mx-1 relative left-1" />
          </button>
        )}

        {/* Custom Next Button (Hide on last slide) */}
        {!isLastSlide && (
          <button
            onClick={slideNext}
            className="absolute cursor-pointer top-1/2 -translate-y-1/2 -right-4 bg-gray-700 py-2 px-2 flex items-center justify-center rounded text-white shadow-md z-10"
            aria-label="Next"
          >
            <ArrowForwardIosIcon className="mx-1" />
          </button>
        )}
      </div>
    </div>
  );
};
HomeSectionCarousel.propTypes = {
  data: PropTypes.array.isRequired,
  section_Name: PropTypes.string.isRequired,
};

export default HomeSectionCarousel;
