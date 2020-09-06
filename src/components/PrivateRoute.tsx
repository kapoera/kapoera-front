import React, { useContext } from 'react'
import axios from '@/utils/axios';
import { GlobalContext } from '@/context';
import { Route, Redirect, RouteProps } from 'react-router-dom'

interface PrivateRouteProps extends RouteProps {
    children: React.ReactChild;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = (props: PrivateRouteProps) => {
    const { children, ...rest } = props;
    const { state: { isAdmin } } = useContext(GlobalContext);
    console.log(isAdmin)

    return (
        <Route {...rest}>
            {isAdmin ? children : <Redirect to="/" />}
        </Route>
    )

    //    return (
    //        <Route
    //            {...routeProps}
    //            render={() => (true ?
    //                render() :
    //                <Redirect to='/' />)
    //            }
    //        />
    //    );
};
