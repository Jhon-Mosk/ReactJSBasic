import { Link as RouterLink, useParams } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createRemoveChat } from '../../store/chats/actions';
import { createHideMessageForm, createShowMessageForm } from '../../store/messageForm';
import { shallowEqual } from "react-redux";
import { getChatList } from '../../store/chats/selectors';
import { useCallback } from 'react';
import { createRemoveMessages } from '../../store/messages';

const useStyles = makeStyles(() => ({
    wrap: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    link: {
        flexGrow: 2,
        color: `rgba(0, 0, 0, 0.87)`,
        textDecoration: `none`,
    },
    active: {
        color: "white",
        background: "#282c34",
        borderRadius: 0,
        '&:hover': {
            background: "#3f51b5",
        },
    },
    disable: {
        color: "#282c34",
        background: "none",
        borderRadius: 0,
        '&:hover': {
            background: "#3f51b5",
        },
    },
}));

export default function ChatList() {
    const classes = useStyles();
    const chats = useSelector(getChatList, shallowEqual);
    const dispatch = useDispatch();
    const { chatId } = useParams();

    //удаление чата
    const deleteChat = useCallback((event) => {
        dispatch(createHideMessageForm())
        dispatch(createRemoveChat(event.target.parentElement.id || event.target.id));
        dispatch(createRemoveMessages(event.target.parentElement.id || event.target.id));
    }, [dispatch]);
    //меняет видимость поля ввода
    const changeMessageFormVisibility = useCallback(() => {
        dispatch(createShowMessageForm())
    }, [dispatch]);

    return (
        chats.map((item) => (
            <div className={classes.wrap} key={item.id}>
                <RouterLink className={classes.link} to={`/chats/${item.id}`}>
                    <ListItem className={item.id === chatId ? classes.active : classes.disable} button onClick={changeMessageFormVisibility} key={item.id}>
                        <ListItemIcon>{<Avatar alt={item.name} src={item.avatar} />}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                </RouterLink>
                <IconButton className={item.id === chatId ? classes.active : classes.disable} id={item.id} onClick={deleteChat} aria-label="delete">
                    <DeleteIcon id={item.id} fontSize="small" />
                </IconButton>
            </div>
        ))
    )
}