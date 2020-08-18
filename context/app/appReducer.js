import {
    UPLOAD_FILE,
    UPLOAD_FILE_ERROR,
    UPLOAD_FILE_SUCCESS,
    CREATE_LINK_ERROR,
    CREATE_LINK_SUCCESS,
    SHOW_ALERT,
    CLEAN_MESSAGE,
    CLEAN_STATE,
    CHANGE_PASSWORD,
    ADD_DOWNLOADS,
} from '../../types';

const appReducer = (state, action) => {
    switch (action.type) {
        case SHOW_ALERT:
            return { ...state, messageFile: action.payload };
        case CLEAN_MESSAGE:
            return { ...state, messageFile: null };
        case UPLOAD_FILE:
            return { ...state, loading: true };
        case UPLOAD_FILE_SUCCESS:
            return {
                ...state,
                name: action.payload.name,
                originalName: action.payload.originalName,
                loading: null,
            };
        case UPLOAD_FILE_ERROR:
            return { ...state, messageFile: action.payload, loading: null };

        case CREATE_LINK_SUCCESS:
            return { ...state, url: action.payload };

        case CLEAN_STATE:
            return {
                ...state,
                messageFile: null,
                name: '',
                originalName: '',
                loading: null,
                downloads: 1,
                password: '',
                author: null,
                url: '',
            };
        case CHANGE_PASSWORD:
            return { ...state, password: action.payload };
        case ADD_DOWNLOADS:
            return { ...state, downloads: action.payload };
        default:
            return state;
    }
};

export default appReducer;
