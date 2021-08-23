import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import firebase from 'firebase';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";


export const Login = () => {
    const [open, setOpen] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleSubmit = async (e) => {
        setError("");

        try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
        } catch (error) {
            setError(error.message);
        }
    };
    
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                handleClose();
            } else {
                handleOpen();
            }
        })
    }, [])

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Вход</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Заполните форму ниже, чтобы войти в свою учетную запись.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        value={email}
                        onChange={handleChangeEmail}
                        id="email"
                        label="Email"
                        type="email"
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        value={password}
                        onChange={handleChangePassword}
                        id="password"
                        label="Пароль"
                        type="password"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        <Link to="/main">Отмена</Link>
                    </Button>
                    <Button onClick={handleSubmit} color="primary">
                        <Link to="/chats">Подтвердить</Link>
                    </Button>
                </DialogActions>
                <DialogContent>
                    <DialogContentText>
                        {error && <p>{error}</p>}
                        Ещё не зарегистрированны? <Link onClick={handleClose} to="/signup">Зарегистрироваться</Link>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    );
}
