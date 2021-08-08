import { CHANGE_USER_IMAGE, CHANGE_USER_NAME, CHANGE_USER_SRC_IMAGE, CHANGE_USER_STATUS } from "./actions";
import Faker from 'faker';

const initialState = {
    showName: false,
    whenTrueStatus: 'В сети',
    whenFalseStatus: 'Не сети',
    name: 'Аноним',
    image: '',
    srcImage: Faker.image.avatar(),
    id: Faker.datatype.uuid(),
};

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_USER_STATUS:
            return {
                ...state,
                showName: !state.showName,
            }

        case CHANGE_USER_NAME:
            return {
                ...state,
                name: action.payload,
            }

        case CHANGE_USER_IMAGE:
            return {
                ...state,
                image: action.payload,
            }

        case CHANGE_USER_SRC_IMAGE:
            return {
                ...state,
                srcImage: action.payload,
            }

        default:
            return state
    }
}
