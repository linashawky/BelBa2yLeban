import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, {
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Link } from "react-router-dom";
import SvgIcon from "react-icons-kit";
import { calendar } from "react-icons-kit/icomoon/calendar";
import { home } from "react-icons-kit/icomoon/home";
import {userTie} from 'react-icons-kit/icomoon/userTie';
import {upload2} from 'react-icons-kit/icomoon/upload2';
import {folderOpen} from 'react-icons-kit/icomoon/folderOpen'

export default class PartnerSidenav extends Component {
  state = {
     BID :localStorage.getItem('ID')

  };

  render() {
    const BID = this.state.BID

    return (
      <Router>
        <Route
          render={({ location, history }) => (
            <React.Fragment>
              <SideNav
                style={{backgroundColor:"#009688"}}
                onSelect={selected => {
                  const to = "/" + selected;
                  window.location = to;
                }}
              >
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="home">
                  <NavItem eventKey={`StaffHomepage/${BID}`}>
                    <NavIcon>
                      <SvgIcon size={20} icon={home} />
                    </NavIcon>
                    <NavText>Home</NavText>

                  </NavItem>
                                    
                  <NavItem eventKey={`ViewProfile/${BID}`}>
                    <NavIcon>
                      <SvgIcon size={20} icon={userTie} />
                    </NavIcon>
                    <NavText> My profile </NavText>
                  </NavItem>

                </SideNav.Nav>
              </SideNav>
              <main />
            </React.Fragment>
          )}
        />
      </Router>
    );
  }
}


