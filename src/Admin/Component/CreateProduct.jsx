import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../../ReduxState/Product/Action";
import {
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const initialSizes = [
  { name: "S", quantity: 0 },
  { name: "M", quantity: 0 },
  { name: "L", quantity: 0 },
];

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: "12px",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  padding: theme.spacing(4),
  background: "#fff",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: "8px",
  padding: theme.spacing(1.5, 4),
  fontWeight: 600,
  textTransform: "none",
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.primary.dark,
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(2),
}));

const CreateProduct = () => {
  const [productData, setProductData] = useState({
    imageUrl: "",
    brand: "",
    title: "",
    color: "",
    discountedPrice: "",
    price: "",
    discountPersent: "",
    size: initialSizes,
    quantity: "",
    topLavelCategory: "",
    secondLavelCategory: "",
    thirdLavelCategory: "",
    description: "",
  });

  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSizeChange = (e, index) => {
    const { name, value } = e.target;
    const sizes = [...productData.size];
    sizes[index][name === "size_quantity" ? "quantity" : name] = value;
    setProductData((prev) => ({ ...prev, size: sizes }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createProduct({ data: productData, jwt }));
    console.log("Product_Data : ", productData);
  };

  return (
    <Fragment>
      <div className="py-12 bg-gray-100 min-h-screen rounded">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-12">
          Add New Product
        </h1>
        <StyledCard className="max-w-5xl mx-auto">
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-10">
              <div className="space-y-4">
                <SectionTitle variant="h5">Product Details</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <TextField
                    fullWidth
                    label="Image URL"
                    name="imageUrl"
                    value={productData.imageUrl}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ bgcolor: "#fafafa" }}
                  />
                  <TextField
                    fullWidth
                    label="Brand"
                    name="brand"
                    value={productData.brand}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ bgcolor: "#fafafa" }}
                  />
                  <TextField
                    fullWidth
                    label="Title"
                    name="title"
                    value={productData.title}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ bgcolor: "#fafafa" }}
                  />
                  <TextField
                    fullWidth
                    label="Color"
                    name="color"
                    value={productData.color}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{ bgcolor: "#fafafa" }}
                  />
                </div>
              </div>

              <Divider />
              <div className="space-y-4">
                <SectionTitle variant="h5">Pricing & Quantity</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <TextField
                    fullWidth
                    label="Quantity"
                    name="quantity"
                    value={productData.quantity}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    sx={{ bgcolor: "#fafafa" }}
                  />
                  <TextField
                    fullWidth
                    label="Price"
                    name="price"
                    value={productData.price}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    sx={{ bgcolor: "#fafafa" }}
                  />
                  <TextField
                    fullWidth
                    label="Discounted Price"
                    name="discountedPrice"
                    value={productData.discountedPrice}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    sx={{ bgcolor: "#fafafa" }}
                  />
                  <TextField
                    fullWidth
                    label="Discount Percentage"
                    name="discountPersent"
                    value={productData.discountPersent}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    sx={{ bgcolor: "#fafafa" }}
                  />
                </div>
              </div>

              <Divider />
              <div className="space-y-4">
                <SectionTitle variant="h5">Categories</SectionTitle>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormControl fullWidth>
                    <InputLabel>Top Level Category</InputLabel>
                    <Select
                      name="topLavelCategory"
                      value={productData.topLavelCategory}
                      onChange={handleChange}
                      label="Top Level Category"
                      sx={{ bgcolor: "#fafafa" }}
                    >
                      <MenuItem value="men">Men</MenuItem>
                      <MenuItem value="women">Women</MenuItem>
                      <MenuItem value="kids">Kids</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Second Level Category</InputLabel>
                    <Select
                      name="secondLavelCategory"
                      value={productData.secondLavelCategory}
                      onChange={handleChange}
                      label="Second Level Category"
                      sx={{ bgcolor: "#fafafa" }}
                    >
                      <MenuItem value="clothing">Clothing</MenuItem>
                      <MenuItem value="accessories">Accessories</MenuItem>
                      <MenuItem value="brands">Brands</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Third Level Category</InputLabel>
                    <Select
                      name="thirdLavelCategory"
                      value={productData.thirdLavelCategory}
                      onChange={handleChange}
                      label="Third Level Category"
                      sx={{ bgcolor: "#fafafa" }}
                    >
                      <MenuItem value="mens_kurta">Men's Kurta</MenuItem>
                      <MenuItem value="top">Tops</MenuItem>
                      <MenuItem value="women_dress">Dresses</MenuItem>
                      <MenuItem value="t-shirts">T-Shirts</MenuItem>
                      <MenuItem value="saree">Saree</MenuItem>
                      <MenuItem value="lengha_choli">Lengha Choli</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>

              <Divider />
              <div className="space-y-4">
                <SectionTitle variant="h5">Description</SectionTitle>
                <TextField
                  fullWidth
                  label="Description"
                  multiline
                  rows={4}
                  name="description"
                  value={productData.description}
                  onChange={handleChange}
                  variant="outlined"
                  sx={{ bgcolor: "#fafafa" }}
                />
              </div>

              <Divider />
              <div className="space-y-4">
                <SectionTitle variant="h5">Sizes & Quantities</SectionTitle>
                {productData.size.map((size, index) => (
                  <div key={index} className="flex flex-col md:flex-row gap-4">
                    <TextField
                      fullWidth
                      label="Size Name"
                      name="name"
                      value={size.name}
                      onChange={(e) => handleSizeChange(e, index)}
                      variant="outlined"
                      sx={{ bgcolor: "#fafafa" }}
                    />
                    <TextField
                      fullWidth
                      label="Quantity"
                      name="size_quantity"
                      type="number"
                      value={size.quantity}
                      onChange={(e) => handleSizeChange(e, index)}
                      variant="outlined"
                      sx={{ bgcolor: "#fafafa" }}
                    />
                  </div>
                ))}
              </div>

              <div className="text-center pt-8">
                <StyledButton variant="contained" type="submit">
                  Add New Product
                </StyledButton>
              </div>
            </form>
          </CardContent>
        </StyledCard>
      </div>
    </Fragment>
  );
};

export default CreateProduct;
