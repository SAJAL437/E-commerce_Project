import {
  Avatar,
  Box,
  Rating,
  Stack,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ReplyIcon from "@mui/icons-material/Reply";
import { useState } from "react";

const ProductReviewCard = () => {
  const [likes, setLikes] = useState(12);

  return (
    <Box
      sx={{
        p: 3,
        mb:3,
        borderRadius: 2,
        border: "1px solid #e0e0e0",
        "&:hover": { boxShadow: 3 },
        backgroundColor: "#fff",
        transition: "all 0.3s ease",
      }}
    >
      <Stack direction="row" spacing={2} alignItems="start">
        {/* Avatar Section */}
        <Avatar
          sx={{ width: 56, height: 56, bgcolor: "#9155fd", fontWeight: "bold" }}
        >
          S
        </Avatar>

        {/* Review Content */}
        <Box flex={1}>
          {/* Name & Date */}
          <div>
            <Typography variant="subtitle1" fontWeight={600}>
              John Doe
            </Typography>
            <Typography variant="caption" color="gray">
              April 5, 2025
            </Typography>
          </div>

          {/* Rating */}
          <Rating value={4.5} precision={0.5} readOnly />

          {/* Review Text */}
          <Typography variant="body2" mt={1}>
            This product is amazing. I love the color and the design. The
            quality exceeded my expectations and delivery was super fast!
          </Typography>

          {/* Actions - Like & Reply */}
          <Stack direction="row" spacing={2} alignItems="center" mt={1.5}>
            <Tooltip title="Mark Helpful">
              <IconButton
                onClick={() => setLikes((prev) => prev + 1)}
                color="primary"
                size="small"
              >
                <ThumbUpIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Typography variant="body2">
              {likes} people found this helpful
            </Typography>

            <Tooltip title="Reply">
              <IconButton size="small">
                <ReplyIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default ProductReviewCard;
