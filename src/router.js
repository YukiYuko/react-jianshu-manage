import React from 'react'
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import App from './App'
import Login from './pages/login'
import Admin from './pages/admin'
import Home from './pages/home';
import Buttons from './components/public/Buttons'
// import Modals from './pages/ui/modals'
import NoMatch from './pages/nomatch'
// import Loadings from './pages/ui/loadings'
// import Notice from './pages/ui/notice'
// import Messages from './pages/ui/messages'
// import Tabs from './pages/ui/tabs'
// import Gallery from './pages/ui/gallery'
// import Carousel from './pages/ui/carousel'
// import FormLogin from './pages/form/login'
// import FormRegister from './pages/form/register'
// import BasicTable from './pages/table/basicTable'
// import HighTable from './pages/table/highTable'
// import Rich from './pages/rich'
// import City from './pages/city/index'
// import Order from './pages/order/index'
// import Common from './common'
// import OrderDetail from './pages/order/detail'
// import BikeMap from './pages/map/bikeMap'
// import User from './pages/user/index'
// import Bar from './pages/echarts/bar/index'
// import Pie from './pages/echarts/pie/index'
// import Line from './pages/echarts/line/index'
// import Permission from './pages/permission'

export default class ERouter extends React.Component{

  render(){
    return (
      <BrowserRouter>
        <App>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/" render={()=>
              <Admin>
                <Switch>
                  <Route path='/home' component={Home} />
                  <Route path="/ui/buttons" component={Buttons} />
                  {/*<Redirect to="/home" />*/}
                  <Route component={NoMatch} />
                </Switch>
              </Admin>
            } />
          </Switch>
        </App>
      </BrowserRouter>
    );
  }
}