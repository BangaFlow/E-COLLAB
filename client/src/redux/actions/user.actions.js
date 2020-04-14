import { userConstants } from '../constants'
import { signUp, signIn, signOut }  from '../../services/user.services'
import { alertActions } from './alert.actions'
import { history } from '../../helpers/history'


export const userActions = {
    register,
    login,
    logout
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
//TODO: handle signout graphql error 'You must be signed in!'
function logout() {
    signOut()
    localStorage.removeItem('user')
    history.push('/')
    return { type: userConstants.LOGOUT }
}

function register(user) {
    return dispatch => {
        dispatch(request(user))

        signUp(user)
            .then(
                data => { 
                    const user = data.data.signUp
                    dispatch(success())
                    localStorage.setItem('user', JSON.stringify(user))
                    history.push('/')
                    dispatch(alertActions.success('Registration successful'))
                },
                error => {
                    dispatch(failure(error.toString()))
                    dispatch(alertActions.error(error.toString()))
                }
            )
    }

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}