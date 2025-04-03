import React, { useState } from "react";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import createTournament from "../util/createTournament";
import isValidForm from "../util/validateForm";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

export default function AddTournment() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [string, setString] = useState("Create a new Bracket!");
  const [checkedA, setCheckedA] = useState(true);
  const [checkedB, setCheckedB] = useState(false);
  const handleChangeA = (event) => {
    setCheckedA(true);
    // setCheckedB(false);
  };

  const handleChangeB = (event) => {
    setCheckedB(true);
    setCheckedA(false);
  };
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [isEmptyBracket, setIsEmptyBracket] = useState(false);
  const [isParticipants, setIsParticipants] = useState(false);
  const [bracketString, setBracketString] = useState("Bracket Size");
  const [tournament, setTournament] = useState({
    name: "",
    isSingleElimination: true,
    isRoundRobin: false,
    participants: [],
    game: "",
    dates: {
      startDate: new Date().toLocaleDateString(),
      endDate: new Date().toLocaleDateString(),
    },
  });
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleUserChange = (event) => {
    const { name, value } = event.target;
    if (!(name === "participants")) {
      setTournament((previos) => {
        return {
          ...previos,
          [name]: value,
        };
      });
    } else {
      if (!isNaN(value)) {
        setTournament((previos) => {
          return {
            ...previos,
            [name]: value,
          };
        });
      } else {
        setTournament((previos) => {
          return {
            ...previos,
            [name]: value.split("\n"),
          };
        });
      }
    }
  };
  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    if (!isValidForm(tournament)) {
      setString("Invalid Input");
    } else {
      e.preventDefault();
      const newTournament = createTournament(tournament);
      // * An api call to create a new tournament.
      await fetch("http://0.0.0.0:8080/addTournament", {
        method: "POST",
        body: JSON.stringify(newTournament),
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/");
    }
    setIsLoading(false);
  };
  return (
    <>
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
          <Box
            component='form'
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}>
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
                    color: string === "Create a new Bracket!" ? "black" : "red",
                    margin: "0",
                  }}>
                  {string}
                </p>
              )}
            </Typography>
            <TextField
              margin='normal'
              fullWidth
              onChange={handleUserChange}
              name='name'
              label='Tournament Name'
              type='text'
              onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
              required
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedA}
                    onChange={(event) => {
                      handleChangeA(event);
                      setTournament((preValue) => {
                        return {
                          ...preValue,
                          isRoundRobin: false,
                          isSingleElimination: true,
                        };
                      });
                    }}
                  />
                }
                label='Single Elimination'
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={checkedB}
                    disabled
                    onChange={(event) => {
                      handleChangeB(event);
                      setTournament((preValue) => {
                        return {
                          ...preValue,
                          isRoundRobin: true,
                          isSingleElimination: false,
                        };
                      });
                    }}
                  />
                }
                label={"Round Robin, under construction .."}
              />
            </FormGroup>
            <Button
              onClick={handleClick}
              required>
              {bracketString}
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
              onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  setIsParticipants(true);
                  setIsEmptyBracket(false);
                  setBracketString("Use number of participants");
                  handleClose();
                }}>
                Use number of participants
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setIsEmptyBracket(true);
                  setIsParticipants(false);
                  setBracketString("Select size of empty bracket");
                  handleClose();
                }}>
                Select size of empty bracket
              </MenuItem>
            </Menu>
            {isEmptyBracket && (
              <TextField
                margin='normal'
                fullWidth
                name='participants'
                label='Enter a number'
                type='number'
                onChange={handleUserChange}
                onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
                required
              />
            )}
            {isParticipants && (
              <>
                <br />
                {
                  <TextField
                    margin='normal'
                    fullWidth
                    name='participants'
                    label='Participants / Teams:'
                    type='text'
                    multiline={true}
                    onChange={handleUserChange}
                    // onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
                    minRows={4}
                    required
                  />
                }
              </>
            )}
            <TextField
              margin='normal'
              fullWidth
              name='game'
              label='game/sport'
              type='text'
              onChange={handleUserChange}
              required
              onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  disablePast={true}
                  required
                  name='startDate'
                  label='Start Date'
                  onChange={(newValue) => {
                    setTournament((preValue) => {
                      let newState = { ...preValue };
                      newState.dates.startDate = new Date(
                        newValue
                      ).toLocaleDateString();
                      return newState;
                    });
                  }}
                />
                <DatePicker
                  disablePast={true}
                  required
                  name='endDate'
                  label='End Date'
                  onChange={(newValue) => {
                    setTournament((preValue) => {
                      let newState = { ...preValue };
                      newState.dates.endDate = new Date(
                        newValue
                      ).toLocaleDateString();
                      return newState;
                    });
                  }}
                />
              </DemoContainer>
            </LocalizationProvider>
            <Button
              type='submit'
              fullWidth
              variant='contained'
              color='primary'
              sx={{ mt: 3, mb: 2 }}>
              Generate It!
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
