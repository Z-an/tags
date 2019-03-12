import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom"

import SignIn from './Components/SignIn'
import Select from './Components/Select'
import Feed from './Components/Feed'

import { connect } from 'react-redux'

const mapStateToProps = state => {
    return {user: state.user}
}

class ConnectedAppRouter extends Component<any,any> {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={this.props.user===null? SignIn:Select} />
                    <Route exact path="/:name" component={Feed} />
                </Switch>
            </BrowserRouter>
        )
    }
}

const AppRouter = connect(mapStateToProps)(ConnectedAppRouter)

export default AppRouter;
