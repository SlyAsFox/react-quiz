import axios from 'axios';

export function auth(email, password, isLogin) {
    return async dispatch => {
        const authData = {
            email, password, returnSecureToken: true
        };

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBVrgGuT--z52fll2namFZukUOjxUIYYf8';

        if (isLogin) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBVrgGuT--z52fll2namFZukUOjxUIYYf8'
        }

        const response = await axios.post(url, authData);
        const data = response.data;
    }
}