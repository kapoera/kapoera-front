import React, { useContext } from 'react'
import axios from '@/utils/axios';
import { GlobalContext } from '@/context';
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({ render, ...routeProps }) => {
    const { state: { isAdmin } } = useContext(GlobalContext);
    console.log(isAdmin)
    return (
        <Route
            {...routeProps}
            render={() => (isAdmin ?
                render() :
                <Redirect to='/' />)
            }
        />
    );
};
