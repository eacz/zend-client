import React, { useReducer } from 'react';
import authContext from './authContext';
import authReducer from './authReducer';
import {
    REGISTER_SUCCESS,
    REGISTER_ERROR,
    CLEAN_MESSAGE,
    AUTHENTICATE_USER,
    LOGIN_ERROR,
    LOGIN_SUCCESS,
    LOGOUT,
} from '../../types';
import axiosClient from '../../config/axios';
import tokenAuth from '../../config/tokenAuth';

const AuthState = (props) => {
    const initialState = {
        token:
            typeof window !== 'undefined'
                ? localStorage.getItem('z_token')
                : '',
        auth: null,
        user: null,
        message: null,
    };

    const [state, dispatch] = useReducer(authReducer, initialState);

    const authenticateUser = async () => {
        const token = localStorage.getItem('z_token');
        if (token) {
            tokenAuth(token);
        }

        try {
            const res = await axiosClient.get('/api/auth');
            if (res.data.user) {
                dispatch({
                    type: AUTHENTICATE_USER,
                    payload: res.data.user,
                });
            }
        } catch (error) {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.message,
            });
        }
    };

    const registerUser = async (data) => {
        try {
            const res = await axiosClient.post('/api/users', data);
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data.message,
            });
        } catch (error) {
            dispatch({
                type: REGISTER_ERROR,
                payload: error.response.data.message,
            });
        }
        setTimeout(() => {
            dispatch({
                type: CLEAN_MESSAGE,
            });
        }, 4000);
    };

    const login = async (data) => {
        try {
            const res = await axiosClient.post('/api/auth', data);
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data.token,
            });
        } catch (error) {
            //console.log(error.response)
            dispatch({
                type: LOGIN_ERROR,
                payload: error.response.data.message,
            });
        }

        setTimeout(() => {
            dispatch({
                type: CLEAN_MESSAGE,
            });
        }, 4000);
    };

    const logout = () => {
        dispatch({
            type: LOGOUT,
        });
    };

    return (
        <authContext.Provider
            value={{
                token: state.token,
                auth: state.auth,
                user: state.user,
                message: state.message,
                authenticateUser,
                registerUser,
                login,
                logout,
            }}
        >
            {props.children}
        </authContext.Provider>
    );
};

export default AuthState;
