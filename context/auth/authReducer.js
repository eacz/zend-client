import {
    AUTHENTICATE_USER,
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAN_MESSAGE,
    LOGIN_SUCCESS,
    LOGIN_ERROR,
    LOGOUT,
} from '../../types';

const authReducer = (state, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
        case REGISTER_ERROR:
        case LOGIN_ERROR:
            return {
                ...state,
                message: action.payload,
            };
        case CLEAN_MESSAGE:
            return {
                ...state,
                message: null,
            };
        case LOGIN_SUCCESS:
            localStorage.setItem('z_token', action.payload);
            return {
                ...state,
                token: action.payload,
                auth: true,
            };
        case AUTHENTICATE_USER:
            return {
                ...state,
                user: action.payload,
                auth: true
                
            };
        case LOGOUT:
            localStorage.removeItem('z_token')
            return {
                ...state,
                user: null,
                token: null,
                auth: null
            };
        default:
            return state;
    }
};
export default authReducer;
