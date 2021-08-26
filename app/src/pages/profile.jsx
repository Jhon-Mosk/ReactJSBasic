import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shallowEqual } from "react-redux";

import firebase from "firebase";
import { firebaseStorage } from '../api/firebase';

import { createChangeUserStatus, createChangeUserName, createChangeUserImage, createChangeUserSrcImage } from '../store/profile/actions';
import { getCurrentUser, getProfile } from '../store/profile/selectors';

import { makeStyles } from '@material-ui/core';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import { checkKeyOnEnter } from '../utils/checkKeyOnEnter';
import uploadUserImage, { userImageURL } from '../api/firebase/uploadUserImage';

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
    const user = useSelector(getCurrentUser);


    useEffect(() => {
        firebaseStorage.ref("userPhoto").child(user.uid).getDownloadURL()
            .then((url) => {
                dispatch(createChangeUserSrcImage(url))
                // Insert url into an <img> tag to "download"
            })
            .catch((error) => {
                // A full list of error codes is available at
                // https://firebase.google.com/docs/storage/web/handle-errors
                switch (error.code) {
                    case 'storage/object-not-found':
                        alert("Файл не существует");
                        // File doesn't exist
                        break;
                    case 'storage/unauthorized':
                        alert("У пользователя нет разрешения на доступ к объекту");
                        // User doesn't have permission to access the object
                        break;
                    case 'storage/canceled':
                        alert("Пользователь отменил загрузку");
                        // User canceled the upload
                        break;

                    // ...

                    case 'storage/unknown':
                        alert("Произошла неизвестная ошибка, проверьте ответ сервера");
                        // Unknown error occurred, inspect the server response
                        break;
                        
                    default:
                        alert (error.code);
                }
            });
    }, [user.uid])

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
        uploadUserImage(user.uid, selectedFile);
    }, [dispatch, user.uid]);

    return (
        <>
            <div className={classes.root}>
                <img className={classes.avatar} src={srcImage} alt={user.displayName || name}></img>
                <div className={classes.wrapUserData}>
                    <div >Имя: {user.displayName || name}</div>
                    <input type="text" value={value} onChange={handleChange} placeholder="Вы можете изменить имя" onKeyDown={checkKey} />
                    <button onClick={setName}>Изменить имя</button>
                    <div>
                        <p><strong>Укажите картинку в формате JPEG, PNG или GIF</strong></p>
                        <p>
                            <input type="file" name="img" accept="image/jpeg,image/png,image/gif" onChange={writeFile} />
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
