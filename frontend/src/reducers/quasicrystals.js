import {DELETE_STRUCTURE_SUCCESS,DELETE_STRUCTURE_FAIL,GET_UNVERIFIED_STRUCTURES_LIST_SUCCESS,GET_UNVERIFIED_STRUCTURES_LIST_FAIL,CHANGE_STRUCTURE_VALIDITY_SUCCESS,CHANGE_STRUCTURE_VALIDITY_FAIL, ADD_STRUCTURE_FAIL, ADD_STRUCTURE_SUCCESS, GET_STRUCTURES_LIST_SUCCESS,GET_STRUCTURE_SUCCESS,GET_STRUCTURE_FAIL } from "../actions/types";

const initialState = {
    structures : [],
    structure: [],
    unverifiedStructures: []
}

export default function(state=initialState, action){
    switch(action.type){
        case GET_STRUCTURES_LIST_SUCCESS:
            return {
                ...state,
                structures: action.payload
            }
        case GET_UNVERIFIED_STRUCTURES_LIST_SUCCESS:
            return {
                ...state,
                unverifiedStructures: action.payload
            }
        case GET_STRUCTURE_SUCCESS:
            return {
                ...state,
                structure: action.payload
            }
        case ADD_STRUCTURE_SUCCESS:
            return {
                ...state,
                structures : [...state.structures, action.payload]
            }
        case CHANGE_STRUCTURE_VALIDITY_SUCCESS:
            return {
                ...state,
                structure: action.payload
            }
        case DELETE_STRUCTURE_SUCCESS:
            return {
                ...state,
                structure: []
            }
        case DELETE_STRUCTURE_FAIL:
        case GET_UNVERIFIED_STRUCTURES_LIST_FAIL:
        case CHANGE_STRUCTURE_VALIDITY_FAIL:
        case ADD_STRUCTURE_FAIL:
        default:
            return {...state}
    }
}