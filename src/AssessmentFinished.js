import { useEffect, useState } from "react";
import { doc, setDoc, getFirestore, getDoc, updateDoc, increment } from "firebase/firestore";
import { Grid, Card, Typography } from '@mui/material';
import { useDispatch, useSelector } from "react-redux";
import LastAttemptStats from "./containers/LastAttemptStats";
import { selectCount, selectDuration, clearExerciseState, selectNameOfExercise, selectDifficultyLevel } from "./features/exercise/exerciseSlice";
import { resetUserTime, selectMinutes, selectSeconds } from './features/userProfile/userProfileSlice';
import { useFirestoreDocData, useUser } from 'reactfire';
import { Link, Navigate } from "react-router-dom";
import GenericHeaderButton from "./components/GenericHeaderButton";
import { getCaloriesBurnt } from "./util";

export default function AssessmentFinished() {
  const dispatch = useDispatch();
  const repCount = useSelector(selectCount);
  const duration = useSelector(selectDuration);
  const minutes = useSelector(selectMinutes);
  const seconds = useSelector(selectSeconds);
  const nameOfExercise = useSelector(selectNameOfExercise);
  const difficulty = useSelector(selectDifficultyLevel);
  const workoutTime = (minutes * 60 + seconds) === 0 ? duration : duration - (minutes * 60 + seconds);
  const { status, data: user } = useUser();
  const firestore = getFirestore();
  const ref = doc(firestore, user.uid, 'userData');
  const { status: firestoreDataStatus, data: userProfileData } = useFirestoreDocData(ref);
  const today = new Date();
  const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
  const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  const caloriesBurnt = getCaloriesBurnt(repCount, workoutTime, nameOfExercise, difficulty, userProfileData?.gender, userProfileData?.age, userProfileData?.weight);

  //todo to save the last attempt stats before clearExerciseState is dispatched, as the component might render a few times and clear stats before sending to Firestore
  const [lastAttemptStats, setLastAttemptStats] = useState({
    repCount,
    workoutTime,
    nameOfExercise,
    caloriesBurnt,
    difficulty,
    date,
    time,
  })

  useEffect(() => {
    return () => {
      dispatch(clearExerciseState());
      dispatch(resetUserTime());
    }
  })

  if (status === 'loading' || firestoreDataStatus === 'loading') {
    return <p>Loading</p>;
  }

  const saveData = () => {
    if (user) {
      setDoc(doc(getFirestore(), user.uid, date + " " + time), { //chose to use time stamp
        lastAttemptStats,
      });
      const caloriesToAdd = parseInt(lastAttemptStats.caloriesBurnt);
      const Ref = doc(getFirestore(), user.uid, 'userData');
      updateDoc(Ref, {
        totalCal: increment(caloriesToAdd)
      });
    }
  }

  if (!user) return <Navigate to={"/"} replace/>;

  return (
    <Card sx={{ backgroundColor: "#000000" }}>
      <Grid container spacing={3} direction="column" alignItems="center">
        <Grid item sx={{ marginTop: "3rem" }}>
          <LastAttemptStats stats={{ repCount, workoutTime, nameOfExercise, caloriesBurnt }} />
        </Grid>
        <Grid item>
          <Typography sx={{ color: "#FFFFFF" }}>
            Select continue to save your workout!
          </Typography>
        </Grid>
        <Grid item>
          <GenericHeaderButton variant="contained" sx={{ backgroundColor: "#444444" }} onClick={saveData} component={Link} to={user ? "/profile" : "/"}>
            Continue
          </GenericHeaderButton>
        </Grid>
        <Grid item>
          <GenericHeaderButton variant="contained" sx={{ backgroundColor: "#444444" }} component={Link} to={"/exercise/" + lastAttemptStats.nameOfExercise}>
            Try Again
          </GenericHeaderButton>
        </Grid>
      </Grid>
    </Card>
  )
}