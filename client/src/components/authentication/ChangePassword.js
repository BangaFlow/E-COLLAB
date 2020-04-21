import React, { useState, useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { alertActions } from '../../redux/actions/index'
import '../../assets/scss/style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../../helpers/history'
import { changePassword } from '../../services/user.services'


function ChangePassword(location) {

    //Local state variables
    const [inputs, setInputs] = useState({
        token:'',
        password:'',
        newpassword:''
    })
    const [submitted, setSubmitted] = useState(false)
    const [changing, setChanging] = useState(false)
    //destructurinn varibales from input
    const { token, password, newpassword } = inputs

    // Redux - getting the authentication.logginging variable
    const alert = useSelector(state => state.alert)
    // Setting up Redux dispatch hook 
    const dispatch = useDispatch()

    useEffect(() => {
        history.listen((location, action) => {
            dispatch(alertActions.clear())
        })
    }, [dispatch])

    //Handle change in inputs
    function handleChange(e) {
        
        const { name, value } = e.target
        setInputs(inputs => ({ ...inputs, [name]: value }))
    }
    // handle form submission
    function handleSubmit(e) {
        e.preventDefault()
        setSubmitted(true)

        if (token && password && newpassword) {
            setChanging(true)
            const { email } = history.location.state
            changePassword({email, password, confirmPassword: newpassword,resetToken: token})
            .then( data => {
                const user = data.data.resetPassword
                user ? console.log("changed successfully!") : console.log("Error!")
                localStorage.setItem('user', JSON.stringify(user))
                history.push('/')
            })
            .catch( err => {
                console.log(err.graphQLErrors[0].message)
                // message.replace('GraphQL error:', '').trim()
            })
        }
    }

    return (
        <div className="auth-wrapper">
        <div className="auth-content">
            <div className="auth-bg">
                <span className="r"/>
                <span className="r s"/>
                <span className="r s"/>
                <span className="r"/>
            </div>
            <div className="col-md-8 offset-md-2">
                {alert.message &&
                    <div className={`alert ${alert.type}`}>{alert.message}</div>
                }
            </div>
            <div className="card">
                <form name="form" onSubmit={handleSubmit} autoComplete="on">
                <div className="card-body text-center">
                    <div className="mb-4">
                        <i className="feather icon-edit auth-icon"/>
                    </div>
                    <h3 className="mb-4">Change Password</h3>
                    <div className="input-group mb-3">
                        <input 
                        type="text" 
                        name="token" 
                        value={token} 
                        onChange={handleChange} 
                        className={'form-control' + (submitted && !token ? ' is-invalid' : '')} 
                        placeholder="Reset-Token" 
                        />
                        {submitted && !token &&
                            <div style={{top: "+4.5em", right: "-10em", color: '#9b45d1', border: '1px solid #9b45d1'}} className="invalid-feedback">Reset-Token is required</div>
                        }
                    </div>
                    <div className="input-group mb-4">
                        <input 
                        type="password" 
                        name="password" 
                        value={password} 
                        onChange={handleChange} 
                        className={'form-control' + (submitted && !password ? ' is-invalid' : '')} 
                        placeholder="Password" 
                        />
                        {submitted && !password &&
                            <div style={{top: "+4.5em", right: "-10em", color: '#9b45d1', border: '1px solid #9b45d1'}} className="invalid-feedback">Password is required</div>
                        }
                    </div>
                    <div className="input-group mb-4">
                        <input 
                        type="password" 
                        name="newpassword" 
                        value={newpassword} 
                        onChange={handleChange} 
                        className={'form-control' + (submitted && !newpassword ? ' is-invalid' : '')} 
                        placeholder="Re-Type New Password" 
                        />
                        {submitted && !newpassword &&
                            <div style={{top: "+4.5em", right: "-10em", color: '#9b45d1', border: '1px solid #9b45d1'}} className="invalid-feedback">Confirm Password is required</div>
                        }
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary">
                            {changing ? <span className="spinner-border spinner-border-sm mr-1">Changing ... </span> : 'Sign In'}
                        </button>
                    </div>
                    <p className="mb-0 text-muted"><NavLink to="/signup">Don’t have an account?</NavLink></p>
                </div>
                </form>
            </div>
        </div>
    </div>
    )
}

export default ChangePassword
