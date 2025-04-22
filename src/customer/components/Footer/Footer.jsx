"use client";

import {
  Box,
  Typography,
  TextField,
  IconButton,
  Link,
  Button,
  useTheme,
} from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn } from "@mui/icons-material";

const footerSections = [
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
      { name: "Investors", href: "/investors" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQs", href: "/faqs" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
    ],
  },
];

const socialLinks = [
  { name: "Facebook", icon: <Facebook />, href: "https://facebook.com" },
  { name: "Twitter", icon: <Twitter />, href: "https://twitter.com" },
  { name: "Instagram", icon: <Instagram />, href: "https://instagram.com" },
  { name: "LinkedIn", icon: <LinkedIn />, href: "https://linkedin.com" },
];

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      component="footer"
      sx={{
        background: "linear-gradient(180deg, #121212 0%, #1c1c1c 100%)",
        color: "#fff",
        py: { xs: 6, md: 8 },
        px: { xs: 3, md: 10 },
        mt: 8,
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {/* Logo/Branding */}
      <Box textAlign="center" mb={5}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            color: theme.palette.primary.main,
            letterSpacing: 2,
            textTransform: "uppercase",
            textShadow: "0 3px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          Your Brand
        </Typography>
        <Typography variant="body2" color="rgba(255,255,255,0.6)" mt={1}>
          Crafting spaces with elegance & innovation
        </Typography>
      </Box>

      {/* Footer Sections */}
      <Box
        display="grid"
        gridTemplateColumns={{
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={5}
        mb={6}
      >
        {footerSections.map((section) => (
          <Box key={section.title}>
            <Typography
              variant="h6"
              mb={2}
              fontWeight="bold"
              sx={{ color: "#ffffff" }}
            >
              {section.title}
            </Typography>
            {section.links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                underline="none"
                sx={{
                  display: "block",
                  color: "rgba(255,255,255,0.8)",
                  mb: 1.5,
                  fontSize: "0.9rem",
                  position: "relative",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    "&::after": {
                      transition: " 0.3s ease",
                    },
                  },
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    left: 0,
                    bottom: -2,
                    width: "0",
                    height: "2px",
                    bgcolor: theme.palette.primary.main,
                    transition: "width 0.3s ease",
                  },
                }}
              >
                {link.name}
              </Link>
            ))}
          </Box>
        ))}

        {/* Social + Newsletter */}
        <Box>
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Stay Connected
          </Typography>
          <Box display="flex" gap={1} mb={3}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  transition: "0.3s",
                  "&:hover": {
                    color: theme.palette.primary.main,
                    transform: "scale(1.2)",
                  },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
          <Typography variant="body2" mb={2} color="rgba(255,255,255,0.7)">
            Subscribe to our newsletter
          </Typography>
          <Box
            component="form"
            display="flex"
            gap={1}
            sx={{ maxWidth: 300, mx: "auto" }}
          >
            <TextField
              placeholder="Enter your email"
              size="small"
              fullWidth
              sx={{
                bgcolor: "white",
                borderRadius: 1,
                input: { padding: "8px 12px" },
                "& fieldset": { border: "none" },
              }}
              inputProps={{ "aria-label": "Email for newsletter" }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                px: 3,
                boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
              }}
            >
              Subscribe
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Divider */}
      <Box
        sx={{
          borderTop: "1px solid rgba(255,255,255,0.2)",
          maxWidth: 1200,
          mx: "auto",
          mb: 3,
        }}
      />

      {/* Footer Note */}
      <Typography
        variant="body2"
        color="rgba(255,255,255,0.5)"
        textAlign="center"
        sx={{ letterSpacing: 0.5 }}
      >
        © {new Date().getFullYear()} Your Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
