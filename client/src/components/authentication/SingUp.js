import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import '../../assets/scss/style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { userActions, alertActions } from '../../redux/actions/index'
import { history } from '../../helpers/history'

function SingUp() {

    //Local state variables
    const [user, setUser] = useState({
        name:'',
        username:'',
        email:'',
        password:''
    })
    const [submitted, setSubmitted] = useState(false)
    //destructurinn varibales from input
    const { name, username, email, password } = user

    // Redux - getting the authentication.logginging variable
    // const loggingIn = useSelector(state => state.authentication.loggingIn)
    const alert = useSelector(state => state.alert)
    const registering = useSelector(state => state.registration.registering)
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
        setUser(user => ({ ...user, [name]: value }))
    }
    // handle form submission
   function handleSubmit(e) {
        e.preventDefault()
        setSubmitted(true)

        if (email && password && name && username) {
            console.log('filled up!')
            //dispatch signup
            dispatch(userActions.register(user))
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
                        <div className={`alert ${alert.type}`}>{alert.message.slice(59,115)}</div>
                    }
                </div>
                <div className="card">
                    <form name="form" onSubmit={handleSubmit} autoComplete="on">
                    <div className="card-body text-center">
                        <div className="mb-4">
                            <i className="feather icon-user-plus auth-icon"/>
                        </div>
                        <h3 className="mb-4">Sign Up</h3>
                        <div className="input-group mb-3">
                            <input 
                            type="name" 
                            name="name" 
                            value={name} 
                            onChange={handleChange} 
                            className={'form-control' + (submitted && !name ? ' is-invalid' : '')} 
                            placeholder="Name" 
                            />
                            {submitted && !name &&
                                <div style={{top: "+4.5em", right: "-10em", color: '#9b45d1', border: '1px solid #9b45d1'}} className="invalid-feedback">Name is required</div>
                            }
                        </div>
                        <div className="input-group mb-3">
                            <input 
                            type="username" 
                            name="username" 
                            value={username} 
                            onChange={handleChange} 
                            className={'form-control' + (submitted && !username ? ' is-invalid' : '')} 
                            placeholder="Username" 
                            />
                            {submitted && !username &&
                                <div style={{top: "+4.5em", right: "-10em", color: '#9b45d1', border: '1px solid #9b45d1'}} className="invalid-feedback">Username is required</div>
                            }
                        </div>
                        <div className="input-group mb-3">
                            <input 
                            type="email" 
                            name="email" 
                            value={email} 
                            onChange={handleChange} 
                            className={'form-control' + (submitted && !email ? ' is-invalid' : '')} 
                            placeholder="E-mail" 
                            />
                            {submitted && !email &&
                                <div style={{top: "+4.5em", right: "-10em", color: '#9b45d1', border: '1px solid #9b45d1'}} className="invalid-feedback">Email is required</div>
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
                        <div className="form-group text-left">
                            <div className="checkbox checkbox-fill d-inline">
                                <input type="checkbox" name="checkbox-fill-1" id="checkbox-fill-a1" />
                                    <label htmlFor="checkbox-fill-a1" className="cr"> Send me the <span style={{fontWeight: 'bold', color: 'black'}}>Newsletter</span> weekly.</label>
                            </div>
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">
                            {registering ? <span className="spinner-border spinner-border-sm mr-1">Creating...</span> : 'Sign Up'}
                            
                            </button>
                        </div>
                        <p className="mb-2 text-muted">All ready have an account? <NavLink to="/auth">Login</NavLink></p>

                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SingUp
