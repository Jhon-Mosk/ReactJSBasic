import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';

const useStyles = makeStyles({
    root: {
        width: `100%`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `#3f51b5`,
        height: 64,
    },
    navLink: {
        color: 'white',
        marginRight: 10,
        fontSize: `1.25rem`,
        fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
        fontWeight: 500,
        lineHeight: 1.6,
        letterSpacing: `0.0075em`,
    },
    navLinkActive: {
        fontWeight: 'bold',
        color: `#282c34`,
    }
});

export default function Navigation() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.links}>
                <NavLink activeClassName={classes.navLinkActive} className={classes.navLink} to="/main">Main</NavLink>
                <NavLink activeClassName={classes.navLinkActive} className={classes.navLink} to="/chats">Chats</NavLink>
                <NavLink activeClassName={classes.navLinkActive} className={classes.navLink} to="/profile">Profile</NavLink>
            </div>
        </div>
    );
}
