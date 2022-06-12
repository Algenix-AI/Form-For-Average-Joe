import React from 'react';
import { Typography, Grid, Box, TextField, Button, Stack } from '@mui/material';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState, useEffect } from 'react';
import { doc, setDoc, getDoc, getFirestore } from "firebase/firestore";
import { useUser } from 'reactfire';
import { Link } from 'react-router-dom';

const Settings = () => {
  const { data: user } = useUser();

  const [nickname, setNickname] = useState("");
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("0");


  useEffect(() => {
    if (user) {
      const firestore = getFirestore();
      const ref = doc(firestore, 'userData', user.uid);

      const inner = async () => {
        return await getDoc(ref);
      };
      inner().then(res => {
        const data = res.data();
        if (data) { // not a first-time user
          setNickname(data.nickname);
          setAge(data.age);
          setWeight(data.weight);
          setHeight(data.height);
          setGender(data.gender);
        }
      });
    }
  }, [user])

  const makeSave = (e) => {
    setDoc(doc(getFirestore(), "userData", user.uid), {
      nickname,
      age: +age,
      weight: +weight,
      height: +height,
      gender,
    });
  }

  const handleChange = (event, newGender) => {
    setGender(newGender);
  };

  return (
    <>
      <Typography align="center" variant="h4" sx={{ paddingTop: "1rem" }}>Settings</Typography>
      <Stack
        component="form"
        alignItems="center"
        sx={{
          width: "30ch",
          paddingTop: "1rem", paddingLeft: "1rem", paddingRight: "1rem", paddingBottom: "1rem",
          backgroundColor: "#FFFFFF", margin: "auto", marginTop: "1rem"
        }}
        spacing={2}
        autoComplete="off"
      >
        <TextField
          label="Nickname"
          value={nickname}
          variant="outlined"
          type={'text'}
          size="small"
          sx={{ backgroundColor: "#FFFFFF", marginTop: "0.5rem" }}
          onChange={(e) => setNickname(e.target.value)}
        />
        <TextField
          label="Age"
          value={age}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setAge(e.target.value)}
          type="number"
        />
        <TextField
          label="Weight"
          value={weight}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setWeight(e.target.value)}
          type="number"
        />
        <TextField
          label="Height"
          value={height}
          variant="outlined"
          size="small"
          sx={{ backgroundColor: "#FFFFFF" }}
          onChange={(e) => setHeight(e.target.value)}
          type="number"
        />
        <ToggleButtonGroup
          color="standard"
          value={gender}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton value="0">Male</ToggleButton>
          <ToggleButton value="1">Female</ToggleButton>
          <ToggleButton value="2">Others</ToggleButton>
        </ToggleButtonGroup>
      </Stack>

      <Grid align="center" sx={{ marginTop: "1rem" }}>
        <Button variant="contained"
                component={Link}
                to={"/profile"}
                onClick={makeSave}
                sx={{ backgroundColor: "#666666" }}>
          Save
        </Button>
      </Grid>
    </>
  )
}

export default Settings;