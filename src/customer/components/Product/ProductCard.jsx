import { useNavigate } from "react-router-dom";
import "./ProductCard.css";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      className="product-card w-[15rem] m-3 transition-all cursor-pointer"
    >
      <div className="h-[20rem] ">
        <img
          className="h-full w-full object-cover object-left-top"
          src={product.imageUrl}
          alt={product.title}
        />
      </div>

      <div className="textPart bg-white p-3">
        <h3 className="text-sm font-medium">{product.brand}</h3>
        <p className="text-sm font-light">{product.title}</p>
        <div className="flex items-center space-x-2 mt-2">
          {/* &#8377; = ₹ */}
          <p className="text-gray-600 text-sm font-bold">
            &#8377;{product.discountedPrice.toFixed(2)}
          </p>
          <p className="text-gray-600 text-sm line-through opacity-50">
            {product.price.toFixed(2)}
          </p>
          <p className="text-green-600 text-sm font-semibold">
            {product.discountPercent}% off
          </p>
        </div>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    brand: PropTypes.string,
    title: PropTypes.string,
    imageUrl: PropTypes.string,
    price: PropTypes.number,
    discountedPrice: PropTypes.number,
    discountPercent: PropTypes.number,
  }).isRequired,
};

ProductCard.defaultProps = {
  product: {
    brand: "Unknown Brand",
    title: "No description available",
    imageUrl: "https://via.placeholder.com/150",
    price: 0,
    discountedPrice: 0,
    discountPercent: 0,
  },
};

export default ProductCard;
