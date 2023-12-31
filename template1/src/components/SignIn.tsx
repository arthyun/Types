import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginStore } from "store/store";
import { useRecoilState } from "recoil";
import axios, { AxiosResponse } from "axios";

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
            href="http://www.k2systems.kr/"
         >
            K2_SYSTEMS
         </Link>{" "}
         {new Date().getFullYear()}
         {"."}
      </Typography>
   );
}

// TODO remove, this demo shouldn't need to reset the theme
const defaultTheme = createTheme();

export default function SignIn() {
   const [isLogin, setIsLogin] = useRecoilState<boolean>(loginStore);

   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const data = {
         userName: formData.get("userName"),
         password: formData.get("password"),
      };

      for (const key in data) {
         if (key === "userName" || key === "password") {
            if (
               data["userName"] === process.env.REACT_APP_USER_NAME &&
               data["password"] === process.env.REACT_APP_USER_PASS
            ) {
               setIsLogin(true);
            }
         }
      }
   };

   return (
      <ThemeProvider theme={defaultTheme}>
         <Container
            component="main"
            maxWidth="xs"
         >
            <CssBaseline />
            <Box
               sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
               }}
            >
               <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
               </Avatar>
               <Typography
                  component="h1"
                  variant="h5"
               >
                  Sign in
               </Typography>
               <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
               >
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     id="userName"
                     label="사용자"
                     name="userName"
                     autoComplete="userName"
                     autoFocus
                  />
                  <TextField
                     margin="normal"
                     required
                     fullWidth
                     name="password"
                     label="비밀번호"
                     type="password"
                     id="password"
                     autoComplete="current-password"
                  />
                  {/* <FormControlLabel
                     control={
                        <Checkbox
                           value="remember"
                           color="primary"
                        />
                     }
                     label="Remember me"
                  /> */}
                  <Button
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2, pt: 1.5, pb: 1.5 }}
                  >
                     Sign In
                  </Button>
                  <Button
                     type="button"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2, pt: 1.5, pb: 1.5 }}
                     onClick={async () => {
                        const response: AxiosResponse<string, any> = await axios.get(
                           "https://jsonplaceholder.typicode.com/users",
                        );
                        const result = response;
                        console.log(result);
                     }}
                  >
                     Test
                  </Button>
                  <Grid container>
                     <Grid
                        item
                        xs
                     >
                        <Link
                           href="#"
                           variant="body2"
                        >
                           Forgot password?
                        </Link>
                     </Grid>
                     {/* <Grid item>
                        <Link
                           href="#"
                           variant="body2"
                        >
                           {"Don't have an account? Sign Up"}
                        </Link>
                     </Grid> */}
                  </Grid>
               </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
         </Container>
      </ThemeProvider>
   );
}
