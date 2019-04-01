import React from 'react';
import { BrowserRouter, Switch} from 'react-router-dom';
import App from './App';
import {FrontendAuth} from "./config/FrontendAuth";
import {routerConfig} from "./config/routerConfig";

export default class ERouter extends React.Component{

  render(){
    return (
      <BrowserRouter>
        <App>
          <Switch>
            <FrontendAuth config={routerConfig}/>
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
}
