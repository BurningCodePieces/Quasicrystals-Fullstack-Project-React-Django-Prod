import { GET_ERRORS, NO_ERRORS } from "../actions/types";

const initialState={
    msg: {},
    status: null
}

export default function(state=initialState, action){
    switch (action.type){
        case GET_ERRORS:
            return{
                msg: action.payload.msg,
                status: action.payload.status
            };
        case NO_ERRORS:
            return{
                msg: {},
                status: null
            }
        default:
            return state;
    }

}