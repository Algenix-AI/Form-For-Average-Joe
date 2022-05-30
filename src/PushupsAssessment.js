import React from 'react';
import AssessmentFinished from "./containers/AssessmentFinished";
import AssessmentInProgress from "./containers/AssessmentInProgress";
import {setExercise} from "./features/exercise/exerciseSlice";
import webcam from './poseDetection/webcam.js';
import {useDispatch} from "react-redux";

const PushupsAssessment = () => {
  const [isFinished, setIsFinished] = React.useState(false);
  const dispatch = useDispatch();

  let stream = React.useRef(null);

  dispatch(setExercise('pushups'));

  React.useEffect(() => {
    webcam(stream);
    // cleanup function stops webcam
    return () => {
      stream.current.getTracks().forEach(track => track.stop());
    }
  }, []) // [] here means no dependencies, so we only render webcam once for performance boost

  return isFinished ? <AssessmentFinished/> : <AssessmentInProgress setIsFinished={setIsFinished}/>;
}

export default PushupsAssessment;