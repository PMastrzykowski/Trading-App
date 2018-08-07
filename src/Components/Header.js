import React, {Component} from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component{
  render(){
    return(
      <div className="header">  
          <NavLink to="/settings" activeClassName="is-active" exact={true}>
          <i className="fa fa-cogs" aria-hidden="true"></i></NavLink>
          <NavLink to="/" activeClassName="is-active">
          <i className="fa fa-line-chart" aria-hidden="true"></i></NavLink>
      </div>
    )
  }
};

export default Header;
