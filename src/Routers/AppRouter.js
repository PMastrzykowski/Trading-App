import React, {Component} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../Components/Header'
import PositionsPage from '../Components/PositionsPage';
import Settings from '../Components/Settings';
import NotFoundPage from '../Components/NotFoundPage';

class AppRouter extends Component {
 render = () =>(
  <BrowserRouter>
    <div className="app">
    <Header />
      <Switch>
        <Route path="/trading-app" component={PositionsPage} exact={true} />
        <Route path="/trading-app/settings" component={Settings} />
        <Route component={NotFoundPage} />
      </Switch>
      {this.props.tooltips.name !== null?<div className="tooltip" style={{top: (this.props.tooltips.mouseY+10) + 'px', left: (this.props.tooltips.mouseX+10) + 'px'}}>{this.props.tooltips.text}</div>:null}
    </div>
  </BrowserRouter>
);
}
function mapStateToProps(state){
  return{
    tooltips: state.tooltips
  }
}
export default connect(mapStateToProps)(AppRouter);
