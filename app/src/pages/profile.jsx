import { makeStyles } from '@material-ui/core';
import Faker from 'faker';
import { useCallback, useState } from 'react';
import store from '../store/store';
import toggleShowName from '../store/profile/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

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

    const { showName, whenTrueStatus, whenFalseStatus } = store.getState();
    const dispatch = store.dispatch;

    const setShowName = useCallback(() => {
        dispatch(toggleShowName);
        setDummy({});
    }, [dispatch]);

    return (
        <>
            <div className={classes.root}>
                <img className={classes.avatar} src={user.avatar} alt={user.name}></img>
                <div>
                    <div className={classes.data}>Имя: {user.name}</div>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={showName}
                                    onChange={setShowName}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label={showName ? <div>{whenTrueStatus}</div> : <div>{whenFalseStatus}</div>}
                        />
                </div>
            </div>
        </>
    );
};
