import React, { useReducer } from 'react';
import appReducer from './appReducer';
import appContext from './appContext';

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
    ADD_DOWNLOADS
} from '../../types';

import axiosClient from '../../config/axios';

const AppState = (props) => {
    const initialState = {
        messageFile: null,
        name: '',
        originalName: '',
        loading: null,
        downloads: 1,
        password: '',
        author: null,
        url: '',
    };

    const [state, dispatch] = useReducer(appReducer, initialState);

    const showAlert = (message) => {
        dispatch({
            type: SHOW_ALERT,
            payload: message,
        });
        setTimeout(() => {
            dispatch({
                type: CLEAN_MESSAGE,
            });
        }, 5000);
    };

    const uploadFile = async (formData, originalName) => {
        dispatch({
            type: UPLOAD_FILE,
        });

        try {
            const res = await axiosClient.post('/api/files', formData);
            console.log(res.data);

            dispatch({
                type: UPLOAD_FILE_SUCCESS,
                payload: {
                    name: res.data.file,
                    originalName,
                },
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: UPLOAD_FILE_ERROR,
                payload: error.response.data.message,
            });
        }
    };

    const generateLink = async () => {
        const data = {
            name: state.name,
            original_name: state.originalName,
            downloads: state.downloads,
            password: state.password,
            author: state.author,
        };

        try {
            const res = await axiosClient.post('/api/links', data);
            //console.log(res.data.url)
            dispatch({
                type: CREATE_LINK_SUCCESS,
                payload: res.data.url,
            });
        } catch (error) {
            console.log(error);
            dispatch({
                type: CREATE_LINK_ERROR,
            });
        }
    };

    const cleanState = () => {
        dispatch({
            type: CLEAN_STATE,
        });
    };

    const addPassword = (password) => {
        dispatch({
            type: CHANGE_PASSWORD,
            payload: password,
        });
    };

    const addDownloadNumber = downloads => {
        dispatch({
            type: ADD_DOWNLOADS,
            payload: downloads
        })
    }

    return (
        <appContext.Provider
            value={{
                name: state.name,
                originalName: state.originalName,
                messageFile: state.messageFile,
                loading: state.loading,
                downloads: state.downloads,
                password: state.password,
                author: state.author,
                url: state.url,
                showAlert,
                uploadFile,
                generateLink,
                cleanState,
                addPassword,
                addDownloadNumber
            }}
        >
            {props.children}
        </appContext.Provider>
    );
};

export default AppState;
