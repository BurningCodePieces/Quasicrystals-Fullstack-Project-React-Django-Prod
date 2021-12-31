import axios from 'axios';
import { createMessage } from './messages';

import {
    GET_ALL_USERS_SUCCESS,
    GET_ALL_USERS_FAIL,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    USER_LOADED_SUCCESS,
    USER_LOADED_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    PASSWORD_RESET_CONFIRM_FAIL,
    PASSWORD_RESET_FAIL,
    PASSWORD_RESET_CONFIRM_SUCCESS,
    PASSWORD_RESET_SUCCESS,
    SIGNUP_FAIL,
    SIGNUP_SUCCESS,
    ACTIVATION_FAIL,
    ACTIVATION_SUCCESS,
    SIGNUP_REQUEST_SENT,
    GET_ERRORS,
    NO_ERRORS,
    USER_LOADING,
    LOADING_VISIBLE,
    LOADING_INVISIBLE
} from "./types"



export const checkAuthenticated = () => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/verify/`, body, config);
            if (res.data.code !== 'token_not_valid') {
                dispatch({ type: LOADING_INVISIBLE })
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({ type: LOADING_INVISIBLE })
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
        } catch (err) {
            dispatch({ type: LOADING_INVISIBLE })
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
    } else {
        dispatch({ type: LOADING_INVISIBLE })
        dispatch({
            type: AUTHENTICATED_FAIL
        });
    }
};

export const load_user = () => async dispatch => {
    dispatch({
        type: USER_LOADING,
    });

    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/me/`, config);
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            });
            dispatch({ type: LOADING_INVISIBLE })

        } catch (err) {
            dispatch({
                type: USER_LOADED_FAIL
            });
            dispatch({ type: LOADING_INVISIBLE })
        }
    } else {
        dispatch({
            type: USER_LOADED_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
    }

};

export const signup = (name, email, password, re_password) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password, re_password });

    try {
        dispatch({
            type: SIGNUP_REQUEST_SENT,
        })
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/`, body, config);
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        })
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(createMessage({ signed_up_successfully: "You have been successfully signed up. Check your email to activate your account." }))
    } catch (err) {
        dispatch({
            type: SIGNUP_FAIL,
            payload: err
        });
        dispatch({ type: LOADING_INVISIBLE })
        const errors = err.response ? { msg: err.response.data, status: err.response.status } : { msg: "Connection to database failed", status: 511 }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    }
};

export const verify = (uid, token) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token });

    try {
        //const res = 
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/activation/`, body, config);
        dispatch({ type: LOADING_INVISIBLE })
        dispatch({
            type: ACTIVATION_SUCCESS,
        })

    } catch (err) {
        dispatch({ type: LOADING_INVISIBLE })
        dispatch({
            type: ACTIVATION_FAIL
        })
    }
};



export const login = (email, password) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/jwt/create/`, body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(load_user());
        dispatch(createMessage({ logged_in_successfully: "You are now logged in." }))
    } catch (err) {
        dispatch({
            type: LOGIN_FAIL,
            payload: err
        })
        const errors = err.response ? { msg: err.response.data, status: err.response.status } : { msg: "Connection to database failed", status: 511 }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
        dispatch({ type: LOADING_INVISIBLE })
    }
};

export const reset_password = (email) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });

    try {
        //const res=
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password/`, body, config);

        dispatch({
            type: PASSWORD_RESET_SUCCESS,
        })
        dispatch({ type: NO_ERRORS })
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(createMessage({ reset_password_link_sent: "Link to reset your password has been sent to your email." }))
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        })
        dispatch({ type: LOADING_INVISIBLE })
        const errors = err.response ? { msg: err.response.data, status: err.response.status } : { msg: "Connection to database failed", status: 511 }
        dispatch(createMessage({ reset_password_error: "An error occured." }))
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
    }
}

export const reset_password_confirm = (uid, token, new_password, re_new_password) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });

    try {
        await axios.post(`${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`, body, config);
        dispatch({ type: LOADING_INVISIBLE })
        dispatch({
            type: PASSWORD_RESET_CONFIRM_SUCCESS,
        })
        dispatch(createMessage({ reset_password_confirmed: "Password changed successfully." }))
    } catch (err) {
        const errors = err.response ? { msg: err.response.data, status: err.response.status } : { msg: "Connection to database failed", status: 511 }
        dispatch({
            type: GET_ERRORS,
            payload: errors
        })
        dispatch({ type: LOADING_INVISIBLE })
        dispatch({
            type: PASSWORD_RESET_CONFIRM_FAIL
        })
        let message = err.response ? err.response.data[0] : "An error occured. Password has not been changed."
        dispatch(createMessage({ reset_password_confirming_error: message }))
    }
}



export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
    dispatch(createMessage({ logged_out: "You have been logged out." }))
    dispatch({ type: LOADING_INVISIBLE })
};

export const get_all_users = () => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        try {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/`, config);
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                payload: res.data
            });
            dispatch({ type: LOADING_INVISIBLE })
        } catch (err) {
            dispatch({
                type: GET_ALL_USERS_FAIL
            });
            dispatch({ type: LOADING_INVISIBLE })
        }
    } else {
        dispatch({
            type: GET_ALL_USERS_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
    }

};



export const update_users_list = (email) => async dispatch => {
    if (localStorage.getItem('access')) {
        dispatch({ type: LOADING_VISIBLE })
        const config = {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        };
        const body = {};
        try {
            await axios.put(`${process.env.REACT_APP_API_URL}/update_user_role_by_email/${email}`, body, config);
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/auth/users/`, config);
            dispatch({ type: LOADING_INVISIBLE })
            dispatch({
                type: GET_ALL_USERS_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage({ user_permission_changed: "Permissions changed successfully." }))

        } catch (err) {
            dispatch({ type: LOADING_INVISIBLE })
            dispatch({
                type: GET_ALL_USERS_FAIL
            });
            let message = err.response ? err.response.data : "Bad request. Server did not return any answer. This probably means there is a problem on our side. Sorry."
            dispatch(createMessage({ user_permission_bad_request: message }))
        }
    } else {
        dispatch({ type: LOADING_INVISIBLE })
        dispatch({
            type: GET_ALL_USERS_FAIL
        });
        dispatch(createMessage({ not_logged_in: "Check if you are still logged in and try again." }))
    }

};