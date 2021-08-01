import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { createRemoveChat } from '../../store/chats/actions';

const useStyles = makeStyles(() => ({
    wrap: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    link: {
        flexGrow: 2,
        color: `rgba(0, 0, 0, 0.87)`,
        textDecoration: `none`,
    }
}));

export default function ChatList() {
    const classes = useStyles();
    const chats = useSelector((state) => state.chats.chatList);
    const dispatch = useDispatch();

    //удаление чата
    const deleteChat = (event) => {
        dispatch(createRemoveChat(event.target.parentElement.id || event.target.id));
    };

    return (
        chats.map((item) => (
            <div className={classes.wrap} key={item.id}>
                <RouterLink className={classes.link} to={`/chats/${item.id}`}>
                    <ListItem button key={item.id}>
                        <ListItemIcon>{<Avatar alt={item.name} src={item.avatar} />}</ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItem>
                </RouterLink>
                <IconButton id={item.id} onClick={deleteChat} aria-label="delete">
                    <DeleteIcon id={item.id} fontSize="small" />
                </IconButton>
            </div>
        ))
    )
}