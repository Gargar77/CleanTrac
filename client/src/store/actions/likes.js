import * as actionTypes from './actionTypes';

export const createLikeStart = () => {
    return {
        type:actionTypes.CREATE_LIKE_START
    }
}

export const createLikeSuccess = () => {
    return {
        type:actionTypes.CREATE_LIKE_SUCCESS
    }
}

export const createLikefail = err => {
    return {
        type:actionTypes.CREATE_LIKE_FAIL,
        error:err.message
    }
}

export const deleteLikeStart = () => {
    return {
        type:actionTypes.DELETE_LIKE_START
    }
}

export const deleteLikeSuccess = () => {
    return {
        type:actionTypes.DELETE_LIKE_SUCCESS
    }
}

export const deleteLikefail = err => {
    return {
        type:actionTypes.DELETE_LIKE_FAIL,
        error:err.message
    }
}

export const newLike = (authToken,userId,likeableId,type) => {
    return dispatch => {
        dispatch(createLikeStart());

        fetch('http://localhost:3001/api/likes', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'content-type':'application/json',
                'Authorization' : 'Bearer ' + authToken
            },
            body: {
                like: {
                    user_id:userId,
                    likeable_id:likeableId,
                    type:type
                }
            }
        })
            .then(res => {
                if (res.status === 201) {
                    dispatch(createLikeSuccess())
                }
            })
            .catch(err => dispatch(createLikefail(err)))

    }
}
