import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { alertActions } from '../../redux/actions/index'
import '../../assets/scss/style.scss'
import { useSelector, useDispatch } from 'react-redux'
import { history } from '../../helpers/history'
import { resetPassword } from '../../services/user.services'

function ResetPassword() {

    //Local state variables
    const [email, setEmail] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

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
        const { value } = e.target
        setEmail(email => email = value )
    }
    // handle form submission
    function handleSubmit(e) {
        e.preventDefault()
        setSubmitted(true)
        
        if (email) {
            setLoading(true)
            resetPassword(email)
            .then( data => {
                data.data.requestReset ? history.push('/change-password') : console.log("Email doesn't exist!")
            })
            .catch( err => {
                console.log(err.graphQLErrors[0].message)
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
                            <i className="feather icon-mail auth-icon"/>
                        </div>
                        <h3 className="mb-4">Reset Password</h3>
                        <div className="input-group mb-3">
                            <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={handleChange} 
                            className={'form-control' + (submitted && !email ? ' is-invalid' : '')} 
                            placeholder="email" 
                            />
                            {submitted && !email &&
                                <div style={{top: "+4.5em", right: "-10em", color: '#9b45d1', border: '1px solid #9b45d1'}} className="invalid-feedback">Email is required</div>
                            }
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">
                                {loading ? <span className="spinner-border spinner-border-sm mr-1">Sending ... </span> : 'Reset password'}
                            </button>
                        </div>
                        <p className="mb-0 text-muted">Don’t have an account?<NavLink to="/signup">Sign Up</NavLink></p>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword
