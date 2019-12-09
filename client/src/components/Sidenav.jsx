import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SideNav, {
  Nav,
  NavItem,
  NavIcon,
  NavText
} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import SvgIcon from "react-icons-kit";
import { home } from "react-icons-kit/icomoon/home";
import {userTie} from 'react-icons-kit/icomoon/userTie';
import BellIcon from 'react-bell-icon';

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
                  <NavItem eventKey={`buyerHomepage/${BID}`}>
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

                  <NavItem eventKey={`notifications/${BID}`}>
                  <NavIcon>
                  <BellIcon width='30' active={true} animate={true}  />                  
                  </NavIcon>
                  <NavText> notifications </NavText>
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


