import PropTypes from "prop-types";

const HomeSectionCard = ({ product = {} }) => {
  return (
    <div className="cursor-pointer flex flex-col items-center bg-white rounded-lg shadow-lg overflow-hidden w-[15rem] mx-3 my-5 px-3 py-5">
      {/* Image Section */}
      <div className="h-[13rem] w-full">
        <img
          className="object-cover object-top w-full h-full rounded-t-lg"
          src={product.imageUrl || "/placeholder.jpg"} // ✅ Added Fallback Image
          alt={product.title || "Product Image"}
        />
      </div>

      {/* Content Section */}
      <div className="p-4 ">
        <h3 className="text-lg font-medium text-gray-900">
          {product.brand || "Unknown Brand"}
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          {product.title || "No description available"}
        </p>
      </div>
    </div>
  );
};

// Add PropTypes Validation
HomeSectionCard.propTypes = {
  product: PropTypes.shape({
    brand: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
};

//Provide Default Props to Avoid Errors
HomeSectionCard.defaultProps = {
  product: {
    brand: "Unknown Brand",
    title: "No description available",
    imageUrl: "/placeholder.jpg", // A default placeholder image
  },
};

export default HomeSectionCard;
