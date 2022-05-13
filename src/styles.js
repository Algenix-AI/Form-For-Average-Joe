import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        color: 'white',
        margin: 0,
        paddingTop: 30,
        paddingBottom: 30,
        background: 'rgba(0, 0, 30, 1)',
    },
    container: {
        backgroundColor: theme.palette.background.teal,
        padding: theme.spacing(9, 0, 9),
    },
    buttons: {
        marginTop: '40px',
        background: 'rgba(20, 20, 140, 1)',
        color: "white",
    },
    majorbuttons: {
        marginTop: '40px',
        background: 'rgba(100, 100, 100, 1)',
        color: "white",
        width: 120,
        fontSize: 12,
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%',
    },
    cardContent: {
        flexGrow: 1,
        background: 'rgba(100, 100, 100, 1)',
        color: 'white',
    }
}));

export default useStyles;