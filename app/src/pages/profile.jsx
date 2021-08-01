import { makeStyles } from '@material-ui/core';
import Faker from 'faker';
import { useCallback, useState } from 'react';
import { createChangeUserStatus, createChangeUserName } from '../store/profile/actions';
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
    wrapUserData: {
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
    }
});

export default function Main() {
    const classes = useStyles();
    const { showName, whenTrueStatus, whenFalseStatus, name } = useSelector((state) => state.profile);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const setShowName = useCallback(() => {
        dispatch(createChangeUserStatus);
    }, [dispatch]);

    const handleChange = useCallback((event) => {
        setValue(event.target.value);
    }, []);

    const setName = useCallback(() => {
        dispatch(createChangeUserName(value));
        setValue('');
    }, [dispatch, value]);

    //проверяем нажат ли энтер в поле ввода, если нажат отправляем сообщение
    const checkKey = (event) => {
        if(event.code === "Enter") {
            setName(value);
        };
    }

    return (
        <>
            <div className={classes.root}>
                <img className={classes.avatar} src={user.avatar} alt={user.name}></img>
                <div className={classes.wrapUserData}>
                    <div >Имя: {name || user.name}</div>
                    <input type="text" value={value} onChange={handleChange} placeholder="Вы можете изменить имя" onKeyDown={checkKey}/>
                    <button onClick={setName}>Изменить имя</button>
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
