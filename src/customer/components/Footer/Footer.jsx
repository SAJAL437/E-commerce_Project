import { Box, Typography, Button } from "@mui/material";

const footerSections = [
  {
    title: "Company",
    links: ["About", "Blog", "Press", "Investors"],
  },
  {
    title: "Support",
    links: ["Contact Us", "FAQs", "Shipping", "Returns"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
  {
    title: "Social",
    links: ["Facebook", "Twitter", "Instagram", "LinkedIn"],
  },
];

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "black",
        color: "white",
        py: 5,
        px: { xs: 3, md: 10 },
        mt: 5,
        textAlign: "center",
      }}
    >
      <Box
        display="grid"
        gridTemplateColumns={{
            
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={4}
      >
        {footerSections.map((section) => (
          <Box key={section.title}>
            <Typography variant="h6" mb={2} fontWeight="bold">
              {section.title}
            </Typography>
            {section.links.map((link) => (
              <Button 
                key={link}
                sx={{
                  color: "white",
                  display: "block",
                  textTransform: "none",
                  mb: 1,
                  fontSize: "0.875rem", // Smaller text for links
                  "&:hover": { color: "gray" },
                }}
              >
                {link}
              </Button>
            ))}
          </Box>
        ))}
      </Box>

      {/* Bottom Text (Copyright etc.) */}
      <Typography variant="body2" mt={5} color="gray">
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
