import React from "react";
import {
  Button,
  Card,
  CardContent,
  styled,
  Typography,
  useTheme,
  Box,
} from "@mui/material";

// Styled component for the triangle background image
const TriangleImg = styled("img")(({ theme }) => ({
  position: "absolute",
  bottom: 0,
  right: 0,
  height: theme.spacing(22),
  opacity: 0.8, // Slight transparency for a modern effect
}));

// Styled component for the trophy image
const TrophyImg = styled("img")(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(2.5),
  right: theme.spacing(4.5),
  height: theme.spacing(12),
}));

const Achievement = () => {
  const theme = useTheme();
  const imageSrc =
    theme.palette.mode === "light"
      ? "/images/misc/triangle-light.png"
      : "/images/misc/triangle-dark.png";

  return (
    <Card
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 3,
        boxShadow: 3,
        height: "100%", // Match height with MonthlyOverview component
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ letterSpacing: 0.5, fontWeight: 600 }}>
          Shop With E-Commerce
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Congratulations 🎉
        </Typography>

        <Typography
          variant="h5"
          sx={{
            my: 3,
            fontWeight: 700,
            color: "primary.main",
          }}
        >
          420.8k
        </Typography>

        <Button
          size="small"
          variant="contained"
          sx={{ textTransform: "none", borderRadius: 2 }}
        >
          View Sales
        </Button>

        {/* Background Triangle Image */}
        <TriangleImg alt="triangle background" src={imageSrc} />

        {/* Trophy Image */}
        <TrophyImg alt="trophy" src="/public/images/misc/trophy.png" />
      </CardContent>
    </Card>
  );
};

export default Achievement;
