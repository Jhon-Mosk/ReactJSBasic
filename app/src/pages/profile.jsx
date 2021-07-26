import { makeStyles } from '@material-ui/core';
import Faker from 'faker';

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
    data: {
        flexBasis: 100,
    }
});

export default function Main() {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root}>
                <img className={classes.avatar} src={user.avatar} alt={user.name}></img>
                <div className={classes.data}>Имя: {user.name}</div>
            </div>
        </>
    );
};
