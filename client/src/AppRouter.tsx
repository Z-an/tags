import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import SignIn from './Components/SignIn'
import Select from './Components/Select'
import { Feed } from './Components/Feed'

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/signin" component={SignIn} />
                    <Route exact path="/select" component={Select} />
                    <Route exact path="/:name" component={Feed} />
                </Switch>
            </BrowserRouter>
        )
    }
}

export default AppRouter;
