import { UNLIKE_SCREAM, LIKE_SCREAM, SET_SCREAMS, LOADING_DATA, DELETE_SCREAM, ADD_POST, SET_SCREAM, SUBMIT_COMMENT } from "../types";

const initialState= {
    screams: [],
    scream: {},
    loading: false
};

function dataReducer(state = initialState, action) {
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading:true
            };
        case SET_SCREAMS:
            return {
                ...state,
                screams: action.payload,
                loading: false
            };
        case SET_SCREAM:
            return{
                ...state,
                scream: action.payload
            };
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex((scream) => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if(state.scream.screamId === action.payload.screamId) {
                state.scream = action.payload;
            }
            return{
                ...state
            };
        case DELETE_SCREAM:
            index = state.screams.findIndex((scream) => scream.screamId === action.payload);
            state.screams.splice(index, 1);
            return{
                ...state
            };
        case ADD_POST:
            return{
                ...state,
                screams:[
                    action.payload,
                    ...state.screams
                ]
            };
        case SUBMIT_COMMENT: 
            return {
                ...state,
                scream: {
                    ...state.scream,
                    comments: [action.payload, ...state.scream.comments]
                }
            }
        default:
            return state;
    }
};

export default dataReducer;