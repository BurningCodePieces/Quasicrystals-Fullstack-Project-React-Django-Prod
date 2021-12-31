import axios from 'axios';
import { createMessage } from './messages';

import {
    GET_STRUCTURES_LIST_SUCCESS,
    GET_STRUCTURES_LIST_FAIL,
    ADD_STRUCTURE_SUCCESS,
    ADD_STRUCTURE_FAIL,
    GET_STRUCTURE_SUCCESS,
    GET_STRUCTURE_FAIL,
    CHANGE_STRUCTURE_VALIDITY_SUCCESS,
    CHANGE_STRUCTURE_VALIDITY_FAIL,
    GET_UNVERIFIED_STRUCTURES_LIST_FAIL,
    GET_UNVERIFIED_STRUCTURES_LIST_SUCCESS,
    DELETE_STRUCTURE_SUCCESS,
    DELETE_STRUCTURE_FAIL,
    LOADING_VISIBLE,
    LOADING_INVISIBLE,
} from "./types"

export const getAllStructures = () => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_all_quasicrystals`, config);
        dispatch({
            type: GET_STRUCTURES_LIST_SUCCESS,
            payload: res.data
        });
        dispatch({ type: LOADING_INVISIBLE })

    } catch (err) {
        dispatch({
            type: GET_STRUCTURES_LIST_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        if (!err.response) {
            dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
        }
    }
}

export const getUnverifiedStructures = () => async dispatch => {

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
            const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_unverified_quasicrystals`, config);
            dispatch({
                type: GET_UNVERIFIED_STRUCTURES_LIST_SUCCESS,
                payload: res.data
            });
            dispatch({ type: LOADING_INVISIBLE })
        } catch (err) {
            dispatch({
                type: GET_UNVERIFIED_STRUCTURES_LIST_FAIL
            });
            dispatch({ type: LOADING_INVISIBLE })
            if (!err.response) {
                dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
            }
        }
    }
    else {
        dispatch({
            type: GET_UNVERIFIED_STRUCTURES_LIST_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
    }
}


export const getAllStructuresForUser = (user_id) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_quasicrystals_for_user/${user_id}`, config);
        dispatch({
            type: GET_STRUCTURES_LIST_SUCCESS,
            payload: res.data
        });
        dispatch({ type: LOADING_INVISIBLE })

    } catch (err) {
        dispatch({
            type: GET_STRUCTURES_LIST_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        if (!err.response) {
            dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
        }
    }
}

export const changeStructureValidity = (id) => async dispatch => {

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
            const res = await axios.put(`${process.env.REACT_APP_API_URL}/change_quasicrystal_validity/${id}`, body, config);
            dispatch({
                type: CHANGE_STRUCTURE_VALIDITY_SUCCESS,
                payload: res.data
            });
            dispatch(createMessage({ structure_status_changed: "Structure status has been changed successfully." }))
            dispatch({ type: LOADING_INVISIBLE })

        } catch (err) {
            dispatch({
                type: CHANGE_STRUCTURE_VALIDITY_FAIL
            });
            if (!err.response) {
                dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))

            }
            dispatch(createMessage({ structure_status_unchanged: "Structure status has NOT been changed" }))
            dispatch({ type: LOADING_INVISIBLE })
        }
    }
    else {
        dispatch({
            type: CHANGE_STRUCTURE_VALIDITY_FAIL
        });
        dispatch(createMessage({ structure_status_unchanged: "Structure status has NOT been changed" }))
        dispatch({ type: LOADING_INVISIBLE })
    }

}

export const getStructure = (id) => async dispatch => {
    dispatch({ type: LOADING_VISIBLE })
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/get_quasicrystal_by_id/${id}`, config);
        dispatch({
            type: GET_STRUCTURE_SUCCESS,
            payload: res.data
        });
        dispatch({ type: LOADING_INVISIBLE })

    } catch (err) {
        dispatch({
            type: GET_STRUCTURE_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        if (!err.response) {
            dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
        }
    }
}


export const addStructure = (structure) => async dispatch => {

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
            const res = await axios.post(`${process.env.REACT_APP_API_URL}/add_new_quasicrystal`, structure, config);
            if (res.status === 200) { // ==
                dispatch({
                    type: ADD_STRUCTURE_SUCCESS,
                    payload: res.data
                });
                dispatch({ type: LOADING_INVISIBLE })
                dispatch(createMessage({ structure_added: "Your structure has been added." }))
            }
            else {
                dispatch({
                    type: ADD_STRUCTURE_FAIL
                });
                dispatch({ type: LOADING_INVISIBLE })
                dispatch(createMessage({ structure_adding_fail: "Your structure has NOT been added." }))
            }


        } catch (err) {
            dispatch({
                type: ADD_STRUCTURE_FAIL
            });
            if (err.response) {
                Object.keys(err.response.data).map((key, index) => (
                    dispatch(createMessage({ structure_error_field_info: "Validation error: " + key + " : " + err.response.data[key] }))
                ))
            }
            dispatch({ type: LOADING_INVISIBLE })
            dispatch(createMessage({ structure_adding_fail: "Your structure has NOT been added." }))
        }
    } else {
        dispatch({
            type: ADD_STRUCTURE_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(createMessage({ structure_adding_fail: "Your structure has NOT been added. Check if you are still logged in and try again." }))
    }

}


export const deleteStructure = (pk) => async dispatch => {
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
            const res = await axios.delete(`${process.env.REACT_APP_API_URL}/delete_quasicrystal_by_id/${pk}`, config);
            dispatch({
                type: DELETE_STRUCTURE_SUCCESS,
                payload: res.data
            });
            dispatch({ type: LOADING_INVISIBLE })
            dispatch(createMessage({ structure_deleted: "The structure has been deleted." }))


        } catch (err) {
            dispatch({
                type: DELETE_STRUCTURE_FAIL
            });
            dispatch({ type: LOADING_INVISIBLE })
            if (!err.response) {
                dispatch(createMessage({ no_server_response: "We are sorry. Server did not return any message. Try again later" }))
            }
            dispatch(createMessage({ structure_deleting_fail: "The structure has NOT been deleted." }))

        }
    }
    else {
        dispatch({
            type: DELETE_STRUCTURE_FAIL
        });
        dispatch({ type: LOADING_INVISIBLE })
        dispatch(createMessage({ structure_deleting_fail: "The structure has NOT been deleted." }))
    }
}