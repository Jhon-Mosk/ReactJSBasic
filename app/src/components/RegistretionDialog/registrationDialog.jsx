import React, { useCallback, useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { createChangeUserName } from '../../store/profile/actions';
import { useDispatch, useSelector } from 'react-redux';
import { checkKeyOnEnter } from '../../utils/checkKeyOnEnter';
import { getProfileName } from '../../store/profile/selectors';

export default function FormDialog() {
    const [open, setOpen] = useState(false);
    const [newUserName, setNewUserName] = useState("");
    const dispatch = useDispatch();
    const name = useSelector(getProfileName);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => setNewUserName(e.target.value);

    const onAddChat = useCallback(() => {
        dispatch(createChangeUserName(newUserName));
        setNewUserName("");
        handleClose();
    }, [dispatch, newUserName]);

    //проверяем нажат ли энтер в поле ввода, если нажат отправляем сообщение
    const checkKey = (event) => {
        if (checkKeyOnEnter(event.code)) {
            onAddChat();
        };
    }

    useEffect(() => {
        if(name === '' || name === undefined || name === "Аноним") {
            handleOpen();
        } else {
            handleClose();
        }
        }, [name]);

    return (
        <div>            
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Пожалуйста представтесь.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={newUserName}
                        onChange={handleChange}
                        onKeyDown={checkKey}
                        id="name"
                        label="Ваш ник"
                        type="email"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Остаться анонимом
                    </Button>
                    <Button onClick={onAddChat} disabled={!newUserName} color="primary">
                        Подтвердить
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
