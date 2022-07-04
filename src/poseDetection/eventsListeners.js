import { Howl, Howler } from "howler";
import { store } from "../app/store";
import { setStage, incrementCount, setIsCanStart, setFeedback } from "../features/exercise/exerciseSlice";
import stageChangeEmitter from "./eventsFactory";

const calibratedSound = new Howl({
  src: [require('../assets/sounds/calibrated.webm'), require('../assets/sounds/calibrated.wav'), require('../assets/sounds/calibrated.mp3')]
});
calibratedSound.volume(1.0)
const repCountSound = new Howl({
  src: [require('../assets/sounds/count.webm'), require('../assets/sounds/count.wav')]
});
Howler.volume(1.0);

const globalListeners = {
  'isCalibrated': () => {
    calibratedSound.play();
    store.dispatch(setStage(1));
    store.dispatch(setFeedback("EXERCISE READY!"));
  },
  'repDone': () => {
    store.dispatch(setStage(1));
    store.dispatch(incrementCount());
    repCountSound.play();
  },
  'clearFeedback': () => {
    store.dispatch(setFeedback(""));
  }
}

const pushupsListeners = {
  'calibrating': () => {
    store.dispatch(setFeedback("Calibrating, get into position!"));
  },
  'inStartingPosition': () => {
    store.dispatch(setIsCanStart(true));
    store.dispatch(setStage(2));
    store.dispatch(setFeedback("EXERCISE BEGIN!")); //todo change this
  },
  'notInStartingPosition': () => {
    store.dispatch(setFeedback("STRAIGHTEN ARM TO START"));
  },
  'malignedRepBackNotStraight': () => {
    store.dispatch(setFeedback("STRAIGHTEN YOUR BACK"));
  },
  'malignedRepBackNotStraightStage3': () => {
    store.dispatch(setStage(2));
    stageChangeEmitter.emit("malignedRepBackNotStraight");
  },
  'maxPointReached': () => {
    store.dispatch(setFeedback(""));
    store.dispatch(setStage(3));
  }
}

const situpListeners = {}

export { globalListeners, pushupsListeners, situpListeners };
