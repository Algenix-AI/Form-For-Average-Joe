import {createRoot} from 'react-dom/client';
import App from './app/App';
import {StrictMode} from 'react';
import {Provider} from 'react-redux';
import {store} from './app/store';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import AssessmentFinished from "./containers/AssessmentFinished";
import MainHeader from "./containers/MainHeader";
import Home from './Home'
import ExerciseAssessment from './ExerciseAssessment';
import DashBoard from './Dashboard';
import Settings from './Settings';
import {ThemeProvider, createTheme, responsiveFontSizes} from '@mui/material/styles';
import {FirebaseAppProvider} from 'reactfire';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAGX6XeU2KMJvP08LKo_iUIC71R81TZpfQ",
  authDomain: "form-for-average-joe.firebaseapp.com",
  projectId: "form-for-average-joe",
  storageBucket: "form-for-average-joe.appspot.com",
  messagingSenderId: "847183773725",
  appId: "1:847183773725:web:8b149912201a34e901c6f4",
  measurementId: "G-0DWTZ7HHW7"
};

export const theme = responsiveFontSizes(createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          color: 'white',
          backgroundColor: "#333333",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        },
      },
    },
    MuiCardMedia: {
      variants: [
        {
          props: {variant: 'webcam'},
          style: {
            paddingTop: '0%'
          },
        },],
      styleOverrides: {
        root: {
          paddingTop: '56.25%',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          flexGrow: 1,
          background: 'rgba(100, 100, 100, 1)',
          color: 'white',
        },
      },
    },
  },
}));

const container = document.getElementById('root');
const root = createRoot(container);

root.render((
  <StrictMode>
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<App/>}>
              <Route element={<MainHeader/>}>
                <Route index path="/" element={<Home/>}/>
                <Route exact path="profile" element={<DashBoard/>}/>
                <Route exact path="settings" element={<Settings/>}/>
              </Route>
              <Route>
                <Route exact path="assessmentend" element={<AssessmentFinished/>}/>
              </Route>
              <Route path="/exercise">
                <Route exact path="pushups" element={<ExerciseAssessment nameOfExercise={"pushups"}/>}/>
                <Route exact path="situps" element={<ExerciseAssessment nameOfExercise={"situps"}/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  </FirebaseAppProvider>
  </StrictMode>
));