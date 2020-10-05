import * as actionTypes from './actionTypes';


export const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    };
};

// handles successful login
export const authSuccess = (token) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token
    }
}

// handles unsuccessful login
export const authFail = (error) => {
    return {
        type:actionTypes.AUTH_FAIL,
        error: error.message
    }
}

export const logInUser = (userData) => {
    return {
        type:actionTypes.LOAD_USER_DATA,
        data:userData
    }
}

export const logOutUSer = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const fetchUserData = (authToken,dispatch) => {
    // get user data upon receiving a jwt token
    let token = authToken.jwt
    fetch('http://localhost:3001/api/user',{
        method:'GET',
        headers: {
            'Accept': 'application/json',
            'content-type':'application/json',
            'Authorization' : 'Bearer ' + token
        }
    })
    .then((res)=> res.json())
    .then((jsonRes) => {
        saveSessionToLocal(token)
        dispatch(authSuccess(token))
        dispatch(logInUser(jsonRes.user))
        console.log(jsonRes)
    })
    .catch(error => console.log("[userFetchError]",error))
}

export const saveSessionToLocal = (token) => {
    let time = new Date();
    time.setMinutes(time.getMinutes()+ 30);
    const expirationDate = time;
    localStorage.setItem('token',token);
    localStorage.setItem('expirationDate',expirationDate);
}


export const auth = (formData) => {
    return dispatch => {
        dispatch(authStart('auth'));
        let url = 'http://localhost:3001/auth/signin';
        // if (isSignUp) {
        //     url = 'http://localhost:3001/auth/signup';
        // }

        fetch(url, {
            method:'POST',
            body: formData,
            redirect: 'manual'
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw Error('Incorrect Email / Password');
            }})
            .then((token)=> { 
                fetchUserData(token,dispatch);
            })
        .catch(err => {
            console.log(err)
             dispatch(authFail(err))
        })
    }
}

export const signUp = (formData) => {
    return dispatch => {

        let url = 'http://localhost:3001/auth/signup';

        fetch(url, {
            method:'POST',
            body: formData,
            redirect: 'manual'
        })
        .then(response => {
           console.log(response.status);
                let email = formData.get('user[email]');
                console.log(email);
                let pw = formData.get('user[password]');
                console.log(pw);
                let newForm = new FormData();
                newForm.append('auth[email]',email);
                newForm.append('auth[password]',pw);
               let ds = auth(newForm);
               ds(dispatch);
        })
        .catch(err=> console.log(err))
    } 
}

export const seAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}


