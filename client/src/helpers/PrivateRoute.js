import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if(!currentUser) {
            // not logged in so redirect to login with return url
            return <Redirect to={{ pathname: '/auth', state: { from: props.location } }} />
        }
        // check if route is restricted by role
        // roles.indexOf(currentUser.role) === -1
        if(roles && roles.some(role => currentUser.roles.findIndex(userRole => userRole.name===role) === -1)) {
            return <Redirect to={{ pathname: '/app/notauthorized'}} />
        }
        
        // authorzied so return component
        return  <Component {...props} />
    }} />
)