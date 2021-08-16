import { useState } from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@material-ui/core";

export const SignUp = () => {
    const [open, setOpen] = useState(true);
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
            await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Регистрация</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Заполните форму ниже, чтобы зарегистрировать новую учетную запись.
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
                        <Link to="/login">Подтвердить</Link>
                    </Button>
                </DialogActions>
                <DialogContent>
                    <DialogContentText>
                        {error && <p>{error}</p>}
                        Уже зарегистрированны? <Link to="/login">Войти</Link>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </div>
    )
}