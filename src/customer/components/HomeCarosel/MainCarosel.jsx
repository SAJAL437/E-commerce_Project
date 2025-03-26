import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { mainCaroselData } from "./MainCaroseldata";

const MainCarosel = () => {
  const items = mainCaroselData.map((item, index) => (
    <img
      key={index}
      className="cursor-pointer
      "
      role="presentation"
      src={item.image}
      alt=""
    />
  ));

  return (
    <AliceCarousel
      autoPlay
      autoPlayStrategy="none"
      autoPlayInterval={1000}
      animationDuration={1000}
      animationType="fadeout"
      infinite
      touchTracking={false}
      disableButtonsControls
      items={items}
    />
  );
};

export default MainCarosel;
