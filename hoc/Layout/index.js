
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexDirection: 'column'
    },
    body: {
        display: 'flex',
        backgroundColor: theme.palette.background.default
    },
    main: {
        flexGrow: 1,
        marginTop: theme.custom.layout.topAppBarHeight,
        minHeight: `calc(100vh - ${theme.custom.layout.topAppBarHeight + theme.custom.layout.footerHeight}px)`,
        backgroundColor: theme.palette.background.default
    }
}));

const Layout = ({ children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.body}>
                <main className={classes.main}>
                    Main layout
                        {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;