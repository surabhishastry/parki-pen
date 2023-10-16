import { styled, Box, Typography } from "@mui/material";

export const ParkiPenLayoutSection = styled('section')(({ theme }) => ({
    color: theme.palette.common.white,
    position: 'relative',
    [theme.breakpoints.up('sm')]: {
      height: '100vh',
      minHeight: 500,
      maxHeight: 1300,
    }
    }));
  
export const Background = styled(Box)({
    position: 'absolute',
    left: 0,
    right: 0,
    top: -25,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    zIndex: -2,
  });
  
  
export const Image = styled(Box)({
    position:"relative",
    minWidth:"75%",
    left:"-10%",
    top:"5%"
  });
  
export const AppName = styled(Typography) ({
    position:"absolute",
    color:"white",
    top:"80px",
    left: "40px",
    fontFamily: "IBMPlexMono, monospace",
    fontStyle: "normal",
    fontWeight: 400
  });
  
export const FeatureText = styled(Typography) ({
    fontSize:22,
    fontFamily: "Open Sans, sans-serif",
    fontStyle: "normal",
    fontWeight: 400
  })