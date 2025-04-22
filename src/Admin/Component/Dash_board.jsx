import React from "react";
import Achivement from "./Achivement";
import MonthlyOverview from "./MonthlyOverview";
import ProductTables from "./ProductTables";

const Dash_board = () => {
  return (
    <div className="p-4">
      {/* Responsive Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <Achivement />
        </div>

        <div className="md:col-span-2">
          <MonthlyOverview />
        </div>


        
      </div>
    </div>
  );
};

export default Dash_board;
