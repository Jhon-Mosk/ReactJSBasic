import { makeStyles } from '@material-ui/core';
import { useCallback, useState } from 'react';
import firebase from "firebase";
import { createChangeUserStatus, createChangeUserName, createChangeUserImage, createChangeUserSrcImage } from '../store/profile/actions';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { useDispatch, useSelector } from 'react-redux';
import { checkKeyOnEnter } from '../utils/checkKeyOnEnter';
import { getProfile } from '../store/profile/selectors';
import { shallowEqual } from "react-redux";

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
    const { showName, whenTrueStatus, whenFalseStatus, name, image, srcImage } = useSelector(getProfile, shallowEqual);
    const [value, setValue] = useState('');
    const dispatch = useDispatch();

    const logOut = () => {
        firebase.auth().signOut().then(() => {
            // Sign-out successful.
        }).catch((error) => {
            console.error(error);
        });
    }

    const setShowName = useCallback(() => {
        dispatch(createChangeUserStatus);
    }, [dispatch]);

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const setName = useCallback(() => {
        dispatch(createChangeUserName(value));
        setValue('');
    }, [dispatch, value]);

    //проверяем нажат ли энтер в поле ввода, если нажат отправляем сообщение
    const checkKey = (event) => {
        if (checkKeyOnEnter(event.code)) {
            setName(value);
        };
    }

    const writeFile = useCallback((event) => {
        let selectedFile = event.target.files[0];
        dispatch(createChangeUserImage(selectedFile));
    }, [dispatch]);

    const sendImage = useCallback(() => {
        let reader = new FileReader();

        reader.onload = function (event) {
            dispatch(createChangeUserSrcImage(event.target.result));
        };

        reader.readAsDataURL(image);
    }, [dispatch, image]);

    return (
        <>
            <div className={classes.root}>
                <img className={classes.avatar} src={srcImage} alt={name}></img>
                <div className={classes.wrapUserData}>
                    <div >Имя: {name}</div>
                    <input type="text" value={value} onChange={handleChange} placeholder="Вы можете изменить имя" onKeyDown={checkKey} />
                    <button onClick={setName}>Изменить имя</button>
                    <div>
                        <p><strong>Укажите картинку в формате JPEG, PNG или GIF</strong></p>
                        <p>
                            <input type="file" name="img" accept="image/jpeg,image/png,image/gif" onChange={writeFile} />
                            <button onClick={sendImage}>Отправить</button>
                        </p>
                    </div>
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
                    <button type="button" onClick={logOut}>Выйти из аккаунта</button>
                </div>
            </div>
        </>
    );
};
