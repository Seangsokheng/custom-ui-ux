import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Fonts } from "@crema/constants/AppEnums";
import AppLogo from "@crema/components/AppLayout/components/AppLogo";

type AuthWrapperProps = {
  children: React.ReactNode;
};

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
       // background: (theme) => `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        py: 4,
      }}
    >
      <Card
        sx={{
          maxWidth: 900,
          minHeight: { xs: 350, sm: 480 },
          width: "100%",
          overflow: "hidden",
          position: "relative",
          display: "flex",
          boxShadow: (theme) => theme.shadows[8],
          borderRadius: 2,
          margin: { xs: 2, sm: 4 },
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", sm: "50%", lg: "40%" },
            padding: { xs: 5, lg: 8 },
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Box sx={{ mb: { xs: 4, xl: 6 } }}>
              <Box
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* <AppLogo /> */}
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    fontWeight: Fonts.BOLD,
                    color: (theme) => theme.palette.primary.main,
                  }}
                >
                  PARAGON
                </Typography>
              </Box>
            </Box>
            {children}
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: "100%", sm: "50%", lg: "60%" },
            position: "relative",
            padding: { xs: 5, lg: 10 },
            display: { xs: "none", sm: "flex" },
            alignItems: { sm: "center" },
            justifyContent: { sm: "center" },
            flexDirection: { sm: "column" },
            backgroundColor: (theme) => theme.palette.grey[900],
            color: (theme) => theme.palette.common.white,
           // backgroundImage: "url('https://source.unsplash.com/random/800x600?campus')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              backgroundColor: "rgba(0,0,0,0.7)",
              backdropFilter: "blur(4px)",
            },
          }}
        >
          <Box
            sx={{
              maxWidth: 320,
              position: "relative", // To appear above the overlay
              zIndex: 1,
              textAlign: "center",
            }}
          >
            <Typography
              component="h2"
              sx={{
                fontWeight: Fonts.BOLD,
                fontSize: 32,
                mb: 2,
                color: "#fff",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              Welcome to Paragon!
            </Typography>
            <Typography
              sx={{
                fontSize: 16,
                mb: 4,
                lineHeight: 1.6,
                color: "rgba(255,255,255,0.9)",
              }}
            >
              Join our exclusive academic community and connect with fellow students at Paragon International University.
            </Typography>
          </Box>
        </Box>
      </Card>
    </Box>
  );
};

export default AuthWrapper;