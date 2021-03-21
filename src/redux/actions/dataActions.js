import { SET_SCREAMS, SET_SCREAM, LOADING_DATA, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, LOADING_UI, SET_ERRORS, CLEAR_ERRORS, ADD_POST, STOP_LOADING_UI, SUBMIT_COMMENT } from '../types';
import axios from 'axios';

//get the posts
export const getPosts = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get('/screams').then(res => {
        dispatch({ 
            type: SET_SCREAMS,
            payload: res.data
        })
    }).catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: []
        })
    });
};

//get a single post
export const getPost = (screamId) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.get(`/scream/${screamId}`).then((res) => {
        dispatch({ type: SET_SCREAM, payload: res.data });
        dispatch({ type: STOP_LOADING_UI });
    }).catch(err => {
        console.log(err);
    });
};

// post a post
export const addPost = (newPost) => (dispatch) => {
    dispatch({ type: LOADING_UI });
    axios.post('/scream', newPost).then(res => {
        dispatch({
            type: ADD_POST,
            payload: res.data
        });
        dispatch({type: CLEAR_ERRORS });
    }).catch(err => {
        dispatch({ type: SET_ERRORS, payload: err.response.data });
    })
};


// Like a post
export const likePost = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/like`).then(res => {
        dispatch({
            type: LIKE_SCREAM,
            payload: res.data
        });
    }).catch(err => console.log(err));
};

//unlike a post
export const unLikePost = (screamId) => (dispatch) => {
    axios.get(`/scream/${screamId}/unlike`).then(res => {
        dispatch({
            type: UNLIKE_SCREAM,
            payload: res.data
        });
    }).catch(err => console.log(err));
};
//comment on a post
export const submitComment = (screamId, commentData) => (dispatch) => {
    axios.post(`/scream/${screamId}/comment`, commentData).then((res) => {
        dispatch({
            type: SUBMIT_COMMENT,
            payload: res.data
        });
        dispatch(clearErrors());
    }).catch(err => {
        dispatch({
            type: SET_ERRORS,
            payload: err.response.data
        })
    });
};

export const deletePost = (screamId) => (dispatch) => {
    axios.delete(`scream/${screamId}`).then(() => {
        dispatch({ type: DELETE_SCREAM, payload: screamId })
    }).catch(err => console.log(err));
};

export const getuser = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios.get(`/user/${userHandle}`).then((res) => {
        dispatch({ 
            type: SET_SCREAMS,
            payload: res.data.screams
        });
    }).catch(err => {
        dispatch({
            type: SET_SCREAMS,
            payload: null
        })
    })
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
};