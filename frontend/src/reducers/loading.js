import { LOADING_VISIBLE, LOADING_INVISIBLE } from "../actions/types";

const initialState={
    loading: false
}

export default function(state=initialState, action){
    switch (action.type){
        case LOADING_VISIBLE:
            return {loading:true}
        
        default:
        case LOADING_INVISIBLE:
            return {loading:false}
    }

}