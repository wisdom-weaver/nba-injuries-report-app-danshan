import React from 'react'
import bettorsightLogo from "../static/bettorsight-logo.svg";

function Layout(props) {
  return (
    <div className="container">
      <div className="logo-continer">
        <img src={bettorsightLogo} alt="" />
      </div>
      <div className="rankings-container">
        <div className="row">
          <div className="col s12">
            <div className="side-card top-side-card">
              <h5 className="center">BEST NBA ODDS</h5>
              <div className="center">
                <a target="_blank" href="https://jgexchange.com/bet.html/">
                  <div className="btn black-btn">click here</div>
                </a>
              </div>
            </div>
          </div>
          <div className="col s12 m10 offset-m1 l8 offset-l2">
            {props.children}
          </div>
          <div className="col s12 m10 offset-m1 l2 side-card side-side-card">
            <h5 className="center">BEST NBA ODDS</h5>
            <div className="center">
              <div className="btn black-btn">click here</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Layout