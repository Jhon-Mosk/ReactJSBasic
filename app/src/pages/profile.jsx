import { makeStyles } from '@material-ui/core';
import Faker from 'faker';
import { useCallback, useState } from 'react';
import store from '../store/store';
import toggleShowName from '../store/profile/actions';

const user = {
    id: Faker.datatype.uuid(),
    avatar: Faker.image.avatar(),
    name: Faker.name.firstName(),
}

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatar: {
        height: 500,
        borderRadius: `50%`,
        margin: 50,
    },
    data: {
        flexBasis: 100,
    }
});

export default function Main() {
    const classes = useStyles();
    const [dummy, setDummy] = useState({});
    
    const { showName, name } = store.getState();
    const dispatch = store.dispatch;

    const setShowName = useCallback(() => {
        dispatch(toggleShowName);
        setDummy({});
    }, [dispatch]);

    return (
        <>
            <div className={classes.root}>
                <img className={classes.avatar} src={user.avatar} alt={user.name}></img>
                <div className={classes.data}>Имя: {user.name}</div>
            </div>
            <div>
                <h4>Profile</h4>
                <input
                    type="checkbox"
                    checked={showName}
                    value={showName}
                    onChange={setShowName}
                />
                <span>Show Name</span>
                {showName && <div>{name}</div>}
            </div>

        </>
    );
};
