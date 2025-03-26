import { mens_kurta } from "../../../Data/mens/men_kurta";
import {saree } from "../../../Data/dress/saree";
import { kurta } from "../../../Data/kurta/kurta";
import { gouns } from "../../../Data/gauns/gouns";
import { LenghaCholi } from "../../../Data/women/LenghaCholi";
import MainCarosel from "../../components/HomeCarosel/MainCarosel";
import HomeSectionCarousel from "../../components/HomeSectionCaresol/HomeSectionCarousel";

const Homepage = () => {
  return (
    <div>
      <MainCarosel />
      <div className="space-y-10 py-20 flex flex-col justify-center">
        <HomeSectionCarousel data={mens_kurta} section_Name="Men's Kurta" />
        <HomeSectionCarousel data={saree} section_Name="Saree's" />
        <HomeSectionCarousel data={kurta} section_Name="Women's kurta" />
        <HomeSectionCarousel
          data={LenghaCholi}
          section_Name="LenghaCholi"
        />
        <HomeSectionCarousel data={gouns} section_Name="Gouns" />
      </div>
    </div>
  );
};

export default Homepage;
