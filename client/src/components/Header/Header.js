import React from 'react';
import "./header.css"

const Header = props => {
  return(
    <div className="row header">
      <div className="col s12 l6">
        <div className="title">
          <span>{props.title}</span>
        </div>
      </div>
      <div className="col s12 l6 userProfile ">
        <span>Signed in as: </span>
        <span className={"username"}>{props.username}</span>
        <i className="material-icons loggout-icon">power_settings_new</i>
      </div>
    </div>
  )
};

export default Header