import { makeStyles } from '@material-ui/core';
import Faker from 'faker';
import { useCallback } from 'react';
import toggleShowName from '../store/profile/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';

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
    const { showName, whenTrueStatus, whenFalseStatus } = useSelector((state) => state)
    const dispatch = useDispatch();

    const setShowName = useCallback(() => {
        dispatch(toggleShowName);
    }, [dispatch]);

    return (
        <>
            <div className={classes.root}>
                <img className={classes.avatar} src={user.avatar} alt={user.name}></img>
                <div style={{minWidth: 200}}>
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
