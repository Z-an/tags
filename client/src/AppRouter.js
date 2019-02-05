import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignIn from "./SignIn/SignIn";
import MerchantSelect from "./MerchantSelect/MerchantSelect";
import Game from "./Game/Game";

class AppRouter extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/" component={SignIn} />
                    <Route exact path="/merchants/:userId" component={MerchantSelect} />
                    <Route exact path="/game/:merchantId/:merchantName/:userId" component={Game} />
                </Switch>
            </BrowserRouter>
        );
    }
}

export default AppRouter;
