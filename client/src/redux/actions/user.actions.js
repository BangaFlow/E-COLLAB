import { userConstants } from '../constants'
import { signIn }  from '../../services/user.services'
import { alertActions } from './alert.actions'
import { history } from '../../helpers/history'


export const userActions = {
    login
}

function login(email, password) {

    return dispatch => {
        dispatch(request({ email, password }))

        signIn(email, password)
            .then(
                data => { 
                    const user = data.data.signIn
                    dispatch(success(user))
                    localStorage.setItem('user', JSON.stringify(user))
                    console.log('Logged in successfully!')
                    history.push('/')
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}