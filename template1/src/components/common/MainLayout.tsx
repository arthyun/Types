import React from "react";
import Header from "./Header";
import { Outlet, useLocation } from "react-router-dom";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const MainLayout = () => {
   // pathname을 감지하여 타이틀 변경해줌
   const location: any = useLocation();
   // console.log(location.pathname);

   return (
      // <div className="wrap">
      <ThemeProvider theme={defaultTheme}>
         <Box sx={{ display: "flex" }}>
            <CssBaseline />
            <Header location={location} />
            <Box
               component="main"
               sx={{
                  backgroundColor: (theme) => (theme.palette.mode === "light" ? theme.palette.grey[100] : theme.palette.grey[900]),
                  flexGrow: 1,
                  height: "100vh",
                  overflow: "auto",
               }}
            >
               <Toolbar />
               <Container
                  maxWidth="xl"
                  sx={{ mt: 9, mb: 9 }}
               >
                  <Outlet />
                  {/* <Copyright sx={{ pt: 4 }} /> */}
               </Container>
            </Box>
         </Box>
      </ThemeProvider>
      // </div>
   );
};

export default MainLayout;

function Copyright(props: any) {
   return (
      <Typography
         variant="body2"
         color="text.secondary"
         align="center"
         {...props}
      >
         {"Copyright © "}
         <Link
            color="inherit"
            href="https://mui.com/"
         >
            Your Website
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}
