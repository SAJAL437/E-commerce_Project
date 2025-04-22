import React from "react";
import {
  AccountCircle,
  CurrencyRupee,
  Phonelink,
  TrendingUp,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Grid2,
  IconButton,
  Typography,
} from "@mui/material";

const salesData = [
  {
    stats: "243k",
    title: "Sales",
    color: "primary.main",
    icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "2.3k",
    title: "Customers",
    color: "success.main",
    icon: <AccountCircle sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "2.3k",
    title: "Products",
    color: "warning.main",
    icon: <Phonelink sx={{ fontSize: "1.75rem" }} />,
  },
  {
    stats: "2.3k",
    title: "Revenue",
    color: "info.main",
    icon: <CurrencyRupee sx={{ fontSize: "1.75rem" }} />,
  },
];

const MonthlyOverview = () => {
  return (
    <Card sx={{ borderRadius: 3, boxShadow: 3, p: 2 }}>
      <CardHeader
        title="Monthly Overview"
        action={
          <IconButton size="small" sx={{ color: "text.secondary" }}>
            {/* Add a more options icon here if needed */}
          </IconButton>
        }
        subheader={
          <Typography variant="body2">
            <Box
              component="span"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              Total 48.5% growth
            </Box>{" "}
            🚀 this month
          </Typography>
        }
        titleTypographyProps={{
          sx: {
            mb: 2,
            fontSize: "1.25rem",
            fontWeight: 600,
          },
        }}
      />
      <CardContent>
        <Grid2 container spacing={8}>
          {salesData.map((item, index) => (
            <Grid2 item xs={12} sm={6} md={3} key={index}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    width: 48,
                    height: 48,
                    boxShadow: 3,
                    bgcolor: item.color,
                    color: "common.white",
                  }}
                >
                  {item.icon}
                </Avatar>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    {item.title}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    {item.stats}
                  </Typography>
                </Box>
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default MonthlyOverview;
