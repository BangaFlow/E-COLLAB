import { userConstants } from '../constants'
import { signIn }  from '../../services/user.services'
<<<<<<< HEAD
import { alertActions } from './alert.actions'
import { history } from '../../helpers/history'


=======
import { history } from '../../helpers/history'

>>>>>>> 66adb6320efd054ca3537e34a7179b435e9ea035
export const userActions = {
    login
}

function login(email, password) {

    return dispatch => {
        dispatch(request({ email, password }))

        signIn(email, password)
            .then(
                data => { 
<<<<<<< HEAD
                    const user = data.data.signIn
=======
                    const user = {
                        username: data.data.signIn.username,
                        userId: data.data.signIn.id
                    }
>>>>>>> 66adb6320efd054ca3537e34a7179b435e9ea035
                    dispatch(success(user))
                    localStorage.setItem('user', JSON.stringify(user))
                    console.log('Logged in successfully!')
                    history.push('/')
                },
                error => {
                    dispatch(failure(error.toString()))
<<<<<<< HEAD
                    dispatch(alertActions.error(error.toString()))
=======
>>>>>>> 66adb6320efd054ca3537e34a7179b435e9ea035
                }
            )
    }

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}