import React from 'react'
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from '../components/NavBar/NavigationBar.js';
import routes from '../routes'


import { BackgroundColorContext } from "../contexts/BackgroundColorContext";

function Layouts(props) {
    const getRoutes = (route) => {
        return route.map((prop, key) => {
            if (prop.layout === "/") {
                return (
                    <Route
                        exact={prop.exact}
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key}
                    />
                );
            }
            else {
                return null;
            }
        })
    }

    

    return (
    <BackgroundColorContext.Consumer>
      {({ color, changeColor }) => (
        <React.Fragment>
            <div className="wrapper">
                <Navbar
                    routes={routes}
                />
                <div className="main-panel" data={color}>
                    <Switch>
                        {getRoutes(routes)}
                        <Redirect from="*" to="/home" />
                    </Switch>
                </div>
            </div>
        </React.Fragment>
            )}
    </BackgroundColorContext.Consumer>
    )
}

export default Layouts
