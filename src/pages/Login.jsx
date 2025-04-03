import { useState } from "react";
import { useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import CircularProgress from "@mui/material/CircularProgress";

import { userContext } from "../App";
import { useNavigate } from "react-router-dom";
import Header from "../component/Header";
export default function SignIn() {
  const navigate = useNavigate();
  const { setUser } = useContext(userContext);
  const [userCredantial, setUserCredantial] = useState({
    Id: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [string, setString] = useState("Sign In");
  const handleUserChnage = (event) => {
    const { name, value } = event.target;
    setUserCredantial((previousUserCredantial) => {
      return {
        ...previousUserCredantial,
        [name]: value,
      };
    });
  };
  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    // ! Calling the server goes here.
    const headers = new Headers();
    headers.set(
      "Authorization",
      "Basic " + btoa(userCredantial.Id + ":" + userCredantial.password)
    );
    const response = await fetch("http://0.0.0.0:8080/auth/login", {
      headers: headers,
    });
    setIsLoading(false);
    if (!response.ok) {
      setString("User name or password is incorrect");
      return;
    }
    const data = await response.json();
    setUser({
      ...data,
      isAuthenticed: true,
      isAdmin: data.type === "admin" ? true : false,
    });
    navigate("/");
    setUserCredantial({
      Id: "",
      password: "",
    });
  };

  return (
    <>
      <Header displayNavLinks={false} />
      <Container
        component='main'
        maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography
            component='h1'
            variant='h5'>
            {isLoading ? (
              <CircularProgress
                color='inherit'
                size={"1.5rem"}
              />
            ) : (
              <p
                style={{
                  color: string === "Sign In" ? "black" : "red",
                  margin: "0",
                }}>
                {string}
              </p>
            )}
          </Typography>
          <Box
            component='form'
            // If login is needed
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              fullWidth
              id='Id'
              label='Id'
              name='Id'
              value={userCredantial.Id}
              onChange={handleUserChnage}
              autoComplete='Id'
              autoFocus
              required
            />
            <TextField
              margin='normal'
              fullWidth
              name='password'
              label='Password'
              value={userCredantial.password}
              onChange={handleUserChnage}
              type='password'
              id='password'
              autoComplete='current-password'
              required
            />
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
