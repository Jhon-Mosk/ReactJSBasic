import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

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

export default function ChatList(props) {
    const classes = useStyles();

    return (
            <div className={classes.wrap} key={props.item.id}>
                <RouterLink className={classes.link} to={`/chats/${props.item.id}`}>
                    <ListItem className={props.item.id === props.chatId ? classes.active : classes.disable} button onClick={props.changeMessageFormVisibility} key={props.item.id}>
                        <ListItemIcon>{<Avatar alt={props.item.name} src={props.item.avatar} />}</ListItemIcon>
                        <ListItemText primary={props.item.name} />
                    </ListItem>
                </RouterLink>
                <IconButton className={props.item.id === props.chatId ? classes.active : classes.disable} id={props.item.id} onClick={props.deleteChat} aria-label="delete">
                    <DeleteIcon id={props.item.id} fontSize="small" />
                </IconButton>
            </div>
        )  
}