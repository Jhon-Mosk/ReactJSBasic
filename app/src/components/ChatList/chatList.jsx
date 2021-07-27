import { Link as RouterLink } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete'

export default function ChatList(props) {
    return (
        props.chatList.map((item) => (
            <RouterLink key={item.id} to={`/chats/${item.id}`}>                       
                <ListItem button key={item.id}>
                    <ListItemIcon>{<Avatar alt={item.name} src={item.avatar} />}</ListItemIcon>
                    <ListItemText primary={item.name} />
                    <IconButton onClick={props.deleteChat} aria-label="delete">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </ListItem>
            </RouterLink> 
        ))
    )
}